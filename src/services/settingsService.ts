export interface UserSettings {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    bookingUpdates: boolean;
    promotions: boolean;
    reminders: boolean;
  };
  privacy: {
    showPhone: boolean;
    showEmail: boolean;
    profileVisibility: 'public' | 'private';
    allowMessages: boolean;
  };
  security: {
    twoFactor: boolean;
    loginAlerts: boolean;
  };
}

const API_BASE = '/api';

export async function saveSettings(userId: string, settings: UserSettings) {
  const response = await fetch(`${API_BASE}/users/${userId}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  });

  if (!response.ok) {
    throw new Error('Falha ao salvar configurações');
  }

  return response.json();
}
