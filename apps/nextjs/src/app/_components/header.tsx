import {
  IconAlertCircle,
  IconLogin,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { validateRequest } from "@tyfons-lab/auth";
import { Button } from "@tyfons-lab/ui-web/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tyfons-lab/ui-web/dropdown-menu";
// import { Input } from "@tyfons-lab/ui-web/input";
import { Sheet, SheetContent, SheetTrigger } from "@tyfons-lab/ui-web/sheet";
import Link from "next/link";

async function Header() {
  const { user } = await validateRequest();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <img src="/Logo2.svg" alt="Tyfons-lab" className="h-14 w-14" />
        </Link>
        <Link
          href="/chat"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Chat
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <img src="/Logo2.svg" alt="Tyfons-lab" className="h-14 w-14" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <img src="/Logo2.svg" alt="Tyfons-lab" className="h-14 w-14" />
            </Link>
            <Link href="/chat" className="hover:text-foreground">
              Chat
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial" />
        {/* <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form> */}
        {!user ? (
          <Link href="/auth">
            <Button variant="secondary" size="icon" className="rounded-full">
              <IconLogin className="h-5 w-5" />
              <span className="sr-only">Sign In</span>
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <IconUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

export default Header;
