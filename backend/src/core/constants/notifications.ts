import { NotificationType } from '../enums/notifications';

export const NotificationMessages = {
  [NotificationType.MUSIC_APPROVED]: (title: string) =>
    `Your track "${title}" has been approved.`,
  [NotificationType.MUSIC_PUBLISHED]: (title: string) =>
    `Your track "${title}" has been published.`,
  [NotificationType.MUSIC_DECLINED]: (title: string) =>
    `Uploading "${title}" is declined. `,
  [NotificationType.MUSIC_BOUGHT]: (title: string, name: string) =>
    `${name} bought "${title} `,
  [NotificationType.MUSIC_FAVORITES]: (title: string, name: string) =>
    `${name} added ${title} to favorites`,
  [NotificationType.MUSIC_MAX_PUBLISHED]:
    'You have uploaded 2/2 tracks in free version. Buy a Pro subscription!',
  [NotificationType.COMMENTED_TO_MUSIC]: (title, name) =>
    `${name} commented on "${title}".`,
  [NotificationType.COMMENTED_TO_COMMENT]: (name) =>
    `${name} name mentioned you in comments.`,
  [NotificationType.UPGRAFE_ACCOUNT]:
    'Congratulations! You can sell your tracks. Upload your first track now!',
  [NotificationType.UPGRAFE_ACCOUNT_PRO]:
    'Your subscription is now Pro! Now you have access to unlimited track uploads.',
  [NotificationType.SUBSCRIPTION_EXPIRED]:
    'We were unable to charge you for your subscription. Check your payment information!',
  [NotificationType.TOP_UP_BALANCE]: (amount: string) =>
    `Your balance is topped up by $ ${amount}.`,
  [NotificationType.WITHDRAWAL]: (amount) =>
    `$${amount} was withdrawn from your wallet to your personal account.`,
  [NotificationType.WITHDRAWAL_REJECTED]: (amount) =>
    `Your withdrawal request for $${amount} was rejected.`,
  [NotificationType.FOLLOWING_USER_ACTION]: (data) =>
    `%${data.avatarUrl}%${data.name} just published new track ${data.title}.`,
  [NotificationType.NEW_FOLLOWER]: (data) =>
    `%${data.avatarUrl}%${data.name} is now following you.`,
  [NotificationType.NEW_PLAYLISTS_FOLLOWER]: (data) =>
    `%${data.avatarUrl}%${data.name} is now following your Playlist.`,
};
