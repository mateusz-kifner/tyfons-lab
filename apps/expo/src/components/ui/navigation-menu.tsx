import * as NavigationMenuPrimitive from "@/components/primitives/navigation-menu";
import { cva } from "class-variance-authority";
import * as React from "react";
import { Platform, View } from "react-native";
import Animated, {
  Extrapolation,
  FadeInLeft,
  FadeOutLeft,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { IconChevronDown } from "@/components/Icons";
import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-row items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
    {Platform.OS === "web" && <NavigationMenuViewport />}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "web:group flex flex-1 web:list-none flex-row items-center justify-center gap-1",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "web:group web:inline-flex h-10 native:h-12 w-max flex-row items-center justify-center rounded-md bg-background native:px-3 px-4 py-2 font-medium text-sm web:transition-colors web:hover:bg-accent web:hover:text-accent-foreground web:focus:bg-accent web:focus:text-accent-foreground web:focus:outline-none active:bg-accent web:disabled:pointer-events-none disabled:opacity-50 web:data-[active]:bg-accent/50 web:data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    value === itemValue
      ? withTiming(1, { duration: 250 })
      : withTiming(0, { duration: 200 }),
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        navigationMenuTriggerStyle(),
        "web:group gap-1.5",
        value === itemValue && "bg-accent",
        className,
      )}
      {...props}
    >
      {/* biome-ignore lint/complexity/noUselessFragments: Native Hack */}
      <>{children}</>
      <Animated.View style={chevronStyle}>
        <IconChevronDown
          size={12}
          className={cn(
            "relative h-3 w-3 text-foreground web:transition web:duration-200",
          )}
          aria-hidden={true}
        />
      </Animated.View>
    </NavigationMenuPrimitive.Trigger>
  );
});
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> & {
    portalHost?: string;
  }
>(({ className, children, portalHost, ...props }, ref) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();
  return (
    <NavigationMenuPrimitive.Portal hostName={portalHost}>
      <NavigationMenuPrimitive.Content
        ref={ref}
        className={cn(
          "top-0 left-0 w-full native:overflow-hidden native:rounded-lg native:border native:border-border native:bg-popover native:text-popover-foreground native:shadow-lg",
          value === itemValue
            ? "web:fade-in web:slide-in-from-right-20 web:animate-in"
            : "web:fade-out web:slide-out-to-left-20 web:animate-out",
          className,
        )}
        {...props}
      >
        <Animated.View
          entering={Platform.OS !== "web" ? FadeInLeft : undefined}
          exiting={Platform.OS !== "web" ? FadeOutLeft : undefined}
        >
          {children}
        </Animated.View>
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Portal>
  );
});
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => {
  return (
    <View className={cn("absolute top-full left-0 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "web:zoom-in-90 relative mt-1.5 web:h-[var(--radix-navigation-menu-viewport-height)] w-full web:origin-top-center web:animate-in overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg",
          className,
        )}
        ref={ref}
        {...props}
      />
    </View>
  );
});
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        value === itemValue
          ? "web:fade-in web:animate-in"
          : "web:fade-out web:animate-out",
        className,
      )}
      {...props}
    >
      <View className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-foreground/5 shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
});
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
