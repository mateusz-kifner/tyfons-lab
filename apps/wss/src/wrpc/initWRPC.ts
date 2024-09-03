interface RouterActionsType {
  onSubscribe?: () => void;
  onUnsubscribe?: () => void;
}

interface RouterMessagesType {
  [key: string]: Promise<void>;
}

export function router(
  messageHandlers: RouterMessagesType,
  lifetimeActions?: RouterActionsType,
) {}

export const serverMessage = {
  emit: async (action: () => Promise<void>) => {},
};

export const peerMessage = {
  emit: async (action: (userId: string) => Promise<void>) => {},
};

export const broadcastMessage = {
  emit: async (action: () => Promise<void>) => {},
};

// WRPC starts here
// based on TRPC

type inferErrorFormatterShape<TType> = TType extends ErrorFormatter<
  any,
  infer TShape
>
  ? TShape
  : DefaultErrorShape;
interface RuntimeConfigOptions<TContext extends object, TMeta extends object>
  extends Partial<
    Omit<
      RootConfig<{
        ctx: TContext;
        meta: TMeta;
        errorShape: any;
        transformer: any;
      }>,
      "$types" | "transformer"
    >
  > {
  transformer?: DataTransformerOptions;
}

type ContextCallback = (...args: any[]) => object | Promise<object>;

class WRPCBuilder<TContext extends object, TMeta extends object> {
  context<TNewContext extends object | ContextCallback>() {
    return new WRPCBuilder<
      TNewContext extends ContextCallback ? Unwrap<TNewContext> : TNewContext,
      TMeta
    >();
  }

  meta<TNewMeta extends object>() {
    return new WRPCBuilder<TContext, TNewMeta>();
  }

  create<TOptions extends RuntimeConfigOptions<TContext, TMeta>>(
    opts?:
      | ValidateShape<TOptions, RuntimeConfigOptions<TContext, TMeta>>
      | undefined,
  ) {
    type $Root = CreateRootTypes<{
      ctx: TContext;
      meta: TMeta;
      errorShape: undefined extends TOptions["errorFormatter"]
        ? DefaultErrorShape
        : inferErrorFormatterShape<TOptions["errorFormatter"]>;
      transformer: undefined extends TOptions["transformer"] ? false : true;
    }>;

    const config: RootConfig<$Root> = {
      transformer: getDataTransformer(opts?.transformer ?? defaultTransformer),
      isDev:
        opts?.isDev ??
        // eslint-disable-next-line @typescript-eslint/dot-notation
        globalThis.process?.env.NODE_ENV !== "production",
      allowOutsideOfServer: opts?.allowOutsideOfServer ?? false,
      errorFormatter: opts?.errorFormatter ?? defaultFormatter,
      isServer: opts?.isServer ?? isServerDefault,
      /**
       * These are just types, they can't be used at runtime
       * @internal
       */
      $types: null as any,
      experimental: opts?.experimental ?? {},
    };

    {
      // Server check
      const isServer: boolean = opts?.isServer ?? isServerDefault;

      if (!isServer && opts?.allowOutsideOfServer !== true) {
        throw new Error(
          `You're trying to use @wrpc/server in a non-server environment. This is not supported by default.`,
        );
      }
    }
    return {
      _config: config,

      procedure: createBuilder<$Root["ctx"], $Root["meta"]>({
        meta: opts?.defaultMeta,
      }),

      middleware: createMiddlewareFactory<$Root["ctx"], $Root["meta"]>(),

      router: createRouterFactory<$Root>(config),

      mergeRouters,

      createCallerFactory: createCallerFactory<$Root>(),
    };
  }
}

export const initWRPC = new WRPCBuilder();
export type { WRPCBuilder };
