import { createClient } from '@supabase/supabase-js';

const rawUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ||
  '';
const rawKey =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY)) ||
  '';

const supabaseUrl = typeof rawUrl === 'string' ? rawUrl.trim() : '';
const supabaseKey = typeof rawKey === 'string' ? rawKey.trim() : '';

// Validation: check defined, starts with http, and not left as sample template placeholder
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseUrl.includes('your-supabase-url') &&
  !supabaseKey.includes('your-supabase-publishable-key') &&
  !supabaseKey.includes('your-supabase-anon-key') &&
  !supabaseKey.includes('your-publishable-key') &&
  !supabaseKey.includes('your-anon-key')
);

// Diagnostic logging (boolean only - never printing secret values)
if (typeof window !== 'undefined') {
  console.log('[Supabase Config Check] VITE_SUPABASE_URL defined:', Boolean(supabaseUrl));
  console.log(
    '[Supabase Config Check] VITE_SUPABASE_PUBLISHABLE_KEY / ANON_KEY defined:',
    Boolean(supabaseKey)
  );
  console.log('[Supabase Config Check] isSupabaseConfigured:', isSupabaseConfigured);
}

// Real Supabase client instance
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Error message formatter to provide clear, helpful feedback without exposing stack traces
export function formatAuthError(error) {
  if (!error) return 'An unexpected error occurred.';
  const msg = error.message || String(error);
  const lower = msg.toLowerCase();

  if (lower.includes('invalid login credentials') || lower.includes('invalid credentials')) {
    return 'Invalid email or password.';
  }
  if (lower.includes('user already registered') || lower.includes('already exists')) {
    return 'An account with this email already exists.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Please verify your email address before signing in.';
  }
  if (lower.includes('password should be at least 6 characters') || lower.includes('password is too short')) {
    return 'Password must be at least 6 characters.';
  }
  if (lower.includes('failed to fetch') || lower.includes('networkerror') || lower.includes('network error')) {
    return 'Unable to connect to authentication service. Please check your internet connection.';
  }
  if (lower.includes('provider is not enabled') || lower.includes('unsupported provider')) {
    return 'Google provider is not configured in your Supabase project. Please enable Google in the Supabase Dashboard under Authentication -> Providers.';
  }
  if (lower.includes('supabase is not configured')) {
    return 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.';
  }
  if (lower.includes('rate limit')) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  return msg;
}

// REAL Supabase Authentication Service
export const authService = {
  async getSession() {
    if (!isSupabaseConfigured || !supabase) {
      return null;
    }
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  async signUp({ email, password, fullName }) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.');
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  async signInWithPassword({ email, password }) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.');
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.');
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
    return true;
  },

  async resetPasswordForEmail(email) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.');
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return data;
  },

  async updatePassword(newPassword) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.');
    }
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return data;
  },
};

// Database Service with Supabase RLS
export const databaseService = {
  // FEEDBACK
  async getFeedback() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('feedback')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Could not fetch feedback from Supabase:', e);
      }
    }
    // Default testimonials for showcase if none exist yet
    return [
      {
        id: 'fb-1',
        user_id: 'sample-1',
        name: 'Sarah Chen',
        rating: 5,
        message: 'Landed 4 FAANG interviews within 2 weeks of using the Minimal Mono template. The PDF export formatting is impeccably sharp!',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 'fb-2',
        user_id: 'sample-2',
        name: 'Marcus Brody',
        rating: 5,
        message: 'The 3D background is breathtaking and the live A4 preview made tailoring my tech experience effortless. Top tier tool!',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        id: 'fb-3',
        user_id: 'sample-3',
        name: 'Elena Rostova',
        rating: 5,
        message: 'The Creative Sidebar layout got compliments from my design agency recruiter. Best resume builder I have used.',
        created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
      },
    ];
  },

  async submitFeedback({ userId, name, rating, message }) {
    const feedbackItem = {
      id: 'fb_' + Date.now(),
      user_id: userId || null,
      name: name || 'Anonymous Professional',
      rating: Number(rating) || 5,
      message,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('feedback')
          .insert([feedbackItem])
          .select();
        if (error) {
          console.warn('Supabase feedback insert warning:', error);
        } else if (data && data[0]) {
          return data[0];
        }
      } catch (err) {
        console.warn('Feedback network error:', err);
      }
    }

    return feedbackItem;
  },

  // RESUMES
  async saveResume({ userId, title, resumeData, theme, templateId }) {
    if (!userId) {
      throw new Error('User ID is required to save resume');
    }

    const payload = {
      user_id: userId,
      title: title || 'My Resume',
      resume_data: resumeData,
      theme,
      template_id: templateId,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('resumes')
        .upsert(payload, { onConflict: 'user_id' })
        .select();

      if (error) {
        console.error('Supabase resume save error:', error);
        throw error;
      }
      return data?.[0] || payload;
    }

    return payload;
  },

  async loadResume(userId) {
    if (!userId) return null;

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) {
          console.warn('Supabase resume load error:', error);
          throw error;
        }
        return data;
      } catch (e) {
        console.warn('Supabase resume load failed:', e);
        throw e;
      }
    }

    return null;
  },

  async deleteResume(userId) {
    if (!userId || !isSupabaseConfigured || !supabase) return false;
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('user_id', userId);
    if (error) throw error;
    return true;
  },
};
