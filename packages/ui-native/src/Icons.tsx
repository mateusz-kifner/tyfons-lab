import {
  type Icon,
  IconAlertCircle,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconX,
} from "@tabler/icons-react-native";
import { cssInterop } from "nativewind";

function interopIcon(icon: Icon) {
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
interopIcon(IconChevronUp);
interopIcon(IconChevronDown);
interopIcon(IconChevronRight);
interopIcon(IconChevronLeft);
interopIcon(IconCheck);
interopIcon(IconX);

export {
  IconAlertCircle,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconX,
};
