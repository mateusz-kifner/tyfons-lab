import {
  IconAlertCircle,
  IconCheck,
  type Icon as TablerIcon,
  IconX,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons-react-native";
import { cssInterop } from "nativewind";

function interopIcon(icon: TablerIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

interopIcon(IconAlertCircle);
interopIcon(IconCheck);
interopIcon(IconX);
interopIcon(IconChevronDown);
interopIcon(IconChevronRight);
interopIcon(IconChevronUp);

export {
  IconAlertCircle,
  IconCheck,
  IconX,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  type TablerIcon,
};
