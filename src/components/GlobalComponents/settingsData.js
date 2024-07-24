import { IoMdSchool, IoIosHelpCircle } from 'react-icons/io';
import { FaUserCog, FaUsers, FaUser } from 'react-icons/fa';
import { MdUpload, MdNotifications } from 'react-icons/md';
import { BiPowerOff } from 'react-icons/bi';

export const settingsDataTeacher = [
  {
    id: '1',
    head: 'ACCOUNT SETTINGS',
    list: [
      {
        name: 'MyAccount',
        icon: IoMdSchool,
      },
      {
        name: 'Help',
        icon: IoIosHelpCircle,
      },
      {
        name: 'Logout',
        icon: BiPowerOff,
      },
    ],
  },
  {
    id: '2',
    head: 'SYSTEM ADMINSTRATOR',
    list: [
      {
        name: 'Notifications',
        icon: MdNotifications,
      },
    ],
  },
  {
    id: '3',
    head: 'DATA MANAGEMENT',
    list: [
      {
        name: 'Manage Classes',
        icon: FaUserCog,
      },
      {
        name: "'Manage Users'",
        icon: FaUsers,
      },
    ],
  },
];

export const settingsDataSchoolAdmin = [
  {
    id: '1',
    head: 'ACCOUNT SETTINGS',
    name: ['MyAccount', 'Help', 'Logout'],
    icon: [FaUser, IoIosHelpCircle, BiPowerOff],
  },
  {
    id: '2',
    head: 'SYSTEM ADMINSTRATOR',
    name: ['Schools', 'Notifications'],
    icon: [IoMdSchool, MdNotifications],
  },
  {
    id: '3',
    head: 'DATA MANAGEMENT',
    name: ['Import', 'Manage Classes', 'Manage Users'],
    icon: [MdUpload, FaUserCog, FaUsers],
  },
];

export const settingsDataStudent = [
  {
    id: '1',
    head: 'ACCOUNT SETTINGS',
    name: ['MyAccount', 'Help', 'Logout'],
    icon: [FaUser, IoIosHelpCircle, BiPowerOff],
  },
  {
    id: '2',
    head: 'SYSTEM ADMINSTRATOR',
    name: ['Notifications'],
    icon: [MdNotifications],
  },
  //   {
  //     id: '3',
  //     head: 'DATA MANAGEMENT',
  //     name: ['Import', 'Manage Classes', 'Manage Users'],
  //     icon: [<MdUpload />, <FaUserCog />, <FaUsers />],
  //   },
];

export const settingsSuperAdmin = [
  {
    id: '1',
    head: 'ACCOUNT SETTINGS',
    name: ['MyAccount', 'Help', 'Logout'],
    icon: [FaUser, IoIosHelpCircle, BiPowerOff],
  },
  {
    id: '2',
    head: 'SYSTEM ADMINSTRATOR',
    name: ['Roles & Privileges'],
    icon: [IoMdSchool],
  },
  {
    id: '3',
    head: 'DATA MANAGEMENT',
    name: ['Manage Users'],
    icon: [FaUsers],
  },
];

export const settingsDataParent = [
  {
    id: '1',
    head: 'ACCOUNT SETTINGS',
    name: ['MyAccount', 'Help', 'Logout'],
    icon: [FaUser, IoIosHelpCircle, BiPowerOff],
  },
  {
    id: '2',
    head: 'SYSTEM ADMINSTRATOR',
    name: ['Notifications'],
    icon: [MdNotifications],
  },
  //   {
  //     id: '3',
  //     head: 'DATA MANAGEMENT',
  //     name: ['Import', 'Manage Classes', 'Manage Users'],
  //     icon: [<MdUpload />, <FaUserCog />, <FaUsers />],
  //   },
];

export const settingsDataStateAdmin = [
  {
    id: '1',
    head: 'ACCOUNT SETTINGS',
    name: ['MyAccount', 'Help', 'Logout'],
    icon: [FaUser, IoIosHelpCircle, BiPowerOff],
  },
  {
    id: '2',
    head: 'SYSTEM ADMINSTRATOR',
    name: [
      'Districts & Schools',
      'Manage Mandates',
      'Notifications',
      'Roles & Privileges',
    ],
    icon: [IoMdSchool, MdNotifications, MdNotifications, MdNotifications],
  },
  {
    id: '3',
    head: 'DATA MANAGEMENT',
    name: ['Import'],
    icon: [MdUpload],
  },
];

export const settingsDataDistrictAdmin = [
  {
    id: '1',
    head: 'ACCOUNT SETTINGS',
    name: ['MyAccount', 'Help', 'Logout'],
    icon: [FaUser, IoIosHelpCircle, BiPowerOff],
  },
  {
    id: '2',
    head: 'SYSTEM ADMINSTRATOR',
    name: [
      'Schools',
      'Email Settings',
      'Manage Mandates',
      'Notifications',
      'Roles & Privileges',
    ],
    icon: [
      IoMdSchool,
      MdNotifications,
      IoMdSchool,
      MdNotifications,
      IoMdSchool,
    ],
  },
  {
    id: '3',
    head: 'DATA MANAGEMENT',
    name: ['End Of Term Process', 'Import', 'Manage Classes', 'Manage Users'],
    icon: [MdUpload, FaUserCog, FaUsers, MdUpload],
  },
];

export const settingsDataPartner = [
  {
    id: '1',
    head: 'ACCOUNT SETTINGS',
    name: ['MyAccount', 'Help', 'Logout'],
    icon: [FaUser, IoIosHelpCircle, BiPowerOff],
  },
  {
    id: '2',
    head: 'SYSTEM ADMINSTRATOR',
    name: ['Districts & Schools', 'Notifications'],
    icon: [IoMdSchool, MdNotifications],
  },
  //   {
  //     id: '3',
  //     head: 'DATA MANAGEMENT',
  //     name: ['Import', 'Manage Classes', 'Manage Users'],
  //     icon: [<MdUpload />, <FaUserCog />, <FaUsers />],
  //   },
];
