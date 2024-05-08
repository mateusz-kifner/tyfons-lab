import { Icon, IconAlertCircle} from '@tabler/icons-react-native';
import { cssInterop } from 'nativewind';

function interopIcon(icon: Icon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

interopIcon( IconAlertCircle );


export { IconAlertCircle };