"use client";
import { useAppSelector } from "@/redux/hooks";
import { MenuList } from "./menu";
import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem as MuiMenuItem,
  Tooltip
} from "@mui/material";
import Image from "next/image";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
type MenuItem = {
  name: string;
  path: string;
  active: boolean;
};

export default function NavbarComponent() {
  const router = useRouter();
  const [menu, setMenu] = useState<MenuItem[]>(MenuList);
  const pathname = usePathname();
  const cart = useAppSelector((state) => state.cart.products);
  let cartLength = cart?.length;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Initialize state with null
  const open = Boolean(anchorEl);
  const { data: session, status } = useSession();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
  };
  return (
    <section>
      {/* <Navbar className="bg-[whitesmoke]">
        <Navbar.Brand href="">
          <Image
            width={1000}
            height={1000}
            src="https://store.istad.co/media/icon_images/favicon.ico"
            className="w-[50px] h-[50px] mr-3 rounded-[50%]"
            alt=""
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Chh1p
          </span>
        </Navbar.Brand>
        <div className="flex justify-center items-center md:order-2">
          <button
            onClick={() => router.push("/cart")}
            className="font-normal mr-2 rounded-lg w-max text-green-600 text-3xl px-3 py-2 relative"
          >
            🛒
            {
              <sup className="bg-red-500 text-white rounded-full w-5 h-5 text-xs absolute -top-1 -right-1">
                {cartLength}
              </sup>
            }
          </button>
          <ButtonLogin />
          <Navbar.Toggle />
        </div>
        <NavbarCollapse>
          {menu.map((item, index) => (
            <NavbarLink
              key={index}
              as={Link}
              href={item.path}
              active={item.path === pathname}
            >
              {item.name}
            </NavbarLink>
          ))}
        </NavbarCollapse>
      </Navbar> */}

      <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
        <div className="flex-1 flex justify-between items-center">
          <Link href="/" className="text-xl">
            Dasumi Store
          </Link>
        </div>

        <label form="menu-toggle" className="pointer-cursor md:hidden block">
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden md:flex md:items-center md:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
              <li>
                <Link className="md:p-4 py-3 px-0 block" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="md:p-4 py-3 px-0 block" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="md:p-4 py-3 px-0 block" href="/policy">
                  Policy
                </Link>
              </li>
              <li>
                <a className="md:p-4 py-3 px-0 block" href="/dashbord">
                  My Shop
                </a>
              </li>
              <div className="flex justify-center items-center md:order-2">
                <button
                  onClick={() => router.push("/cart")}
                  className="font-normal mr-2 rounded-lg w-max text-orange-300 text-3xl px-3 py-2 relative"
                >
                  🛍️
                  {
                    <sup className="bg-red-400 text-white rounded-full w-5 h-5 text-xs absolute -top-1 -right-1">
                      {cartLength}
                    </sup>
                  }
                </button>
              </div>
            </ul>
          </nav>
          <React.Fragment>
            {status === "loading" ? (
              <div>Loading...</div>
            ) : session && session.user ? (
              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center"
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Image
                        src="session.user.image"
                        alt="session.user.name"
                        style={{ width: "40px", borderRadius: "50%" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0
                      }
                    }
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MuiMenuItem
                    onClick={handleClose}
                    className="flex gap-3 items-center justify-center"
                  >
                    <Image
                      src="session.user.image"
                      alt="User Avatar"
                      style={{ width: "40px", borderRadius: "50%" }}
                    />
                    <div>{session.user.name}</div>
                  </MuiMenuItem>
                  <Divider />
                  <MuiMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MuiMenuItem>
                  <MuiMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MuiMenuItem>
                  <MuiMenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MuiMenuItem>
                </Menu>
              </div>
            ) : (
              <Link href="/login" className="text-xl">
                <FaUser />
              </Link>
            )}
          </React.Fragment>
        </div>
      </header>
    </section>
  );
}
