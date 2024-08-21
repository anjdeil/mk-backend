import BillingAddress from './billingAddress.entity';
import Cart from './cart.entity';
import Category from './category.entity';
import MusicsComments from './comments.entity';
import Content from './content.entity';
import MusicsFavorites from './favorites.entity';
import MusicsHistory from './history.entity';
import InnerTransactions from './innerTransactions.entity';
import Instrument from './instrument.entity';
import Key from './key.entity';
import MediaContent from './mediaContent.entity';
import Mood from './mood.entity';
import Music from './music.entity';
import MusicCategories from './musicCategories.entity';
import MusicFiles from './musicFiles.entity';
import MusicInstruments from './musicInstruments.entity';
import MusicKeys from './musicKeys.entity';
import MusicMoods from './musicMoods.entity';
import MusicTypes from './musicTypes.entity';
import Notifications from './notifications.entity';
import Payout from './payout.entity';
import Playlist from './playlist.entity';
import PlaylistMusic from './playlistTracks.entity';
import Reports from './reports.entity';
import ResetPassword from './resetPassword.entity';
import Sales from './sales.entity';
import TrackType from './trackType.entity';
import Transactions from './transactions.entity';
import User from './user.entity';
import Settings from './userSettings.entity';
import Withdrawal from './withdrawal.entity';

// export \* from '\./(\w+)\.entity';  // select every entity name
// import \u$1 from './$1.entity';     // transform each * to be the capitalize name

// import (\w+) from '.*?';\s*         // select every `import ...` line
// $1,                                 // transform each import ... line into a `<entity name>,`
//                                     // then copy and revert

export {
  BillingAddress,
  Cart,
  Category,
  MusicsComments,
  Content,
  MusicsFavorites,
  MusicsHistory,
  InnerTransactions,
  Instrument,
  Key,
  Mood,
  Music,
  MusicCategories,
  MusicFiles,
  MusicInstruments,
  MusicKeys,
  MusicMoods,
  MusicTypes,
  Notifications,
  Payout,
  Reports,
  ResetPassword,
  Sales,
  TrackType,
  Transactions,
  User,
  Settings,
  Withdrawal,
  MediaContent,
  Playlist,
  PlaylistMusic,
};
