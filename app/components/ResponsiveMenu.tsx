"use client";

import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import BrandMark from "./BrandMark";

const drawerWidth = 320;

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
];

export default function ResponsiveMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", pt: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <BrandMark starSize={20} fontSize={15} />
      </Box>
      <Divider />
      <List>
        {[...navItems, { name: "Contact", href: "/#contact" }].map(({ name, href }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              component="a"
              href={href}
              sx={{ textAlign: "center" }}
            >
              <ListItemText
                primary={name}
                slotProps={{
                  primary: {
                    sx: {
                      fontFamily: "var(--font-cormorant-garamond), serif",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontSize: 13,
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        elevation={0}
        position="fixed"
        sx={{
          backgroundColor: scrolled ? "rgba(8,5,16,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "transparent"}`,
          zIndex: 1100,
          transition: "background-color 0.4s ease, border-color 0.4s ease",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open navigation"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "common.white", mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Link
            href="/"
            aria-label="Home"
            underline="none"
            sx={{
              paddingBottom: 0,
              "&::before": { display: "none" },
              opacity: 0.7,
              transition: "opacity 0.2s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            <BrandMark starSize={22} fontSize={16} />
          </Link>

          <Box sx={{ ml: "auto", display: { xs: "none", sm: "flex" }, gap: 0.5 }}>
            {navItems.map(({ name, href }) => (
              <Button
                key={name}
                href={href}
                sx={{
                  color: "common.white",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: "0.04em",
                  px: 2,
                  "&:hover": { color: "info.light", backgroundColor: "transparent" },
                }}
                variant="text"
              >
                {name}
              </Button>
            ))}
            <Button
              href="/#contact"
              variant="outlined"
              sx={{
                ml: 1.5,
                px: 2.5,
                py: 1.25,
                borderColor: "rgba(180,140,255,0.45)",
              }}
            >
              Contact Me
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "background.paper",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
