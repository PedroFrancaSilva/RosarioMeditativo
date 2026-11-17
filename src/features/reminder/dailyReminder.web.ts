// Web: sem notificações locais. Os ajustes escondem o lembrete nesta plataforma;
// este arquivo evita importar expo-notifications no bundle web.
export type ScheduleResult = 'scheduled' | 'denied' | 'failed';

export function configureReminderHandler() {}

export async function scheduleDailyReminder(_hour: number, _minute: number): Promise<ScheduleResult> {
  return 'failed';
}

export async function cancelDailyReminder(): Promise<void> {}
