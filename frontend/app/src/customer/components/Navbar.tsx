import { Box, IconButton, Button, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Storefront from '@mui/icons-material/Storefront';

const isLoggedIn: boolean = true;

const Navbar = () => {
  return (
    <Box>
      <div className="flex items-center justify-between px-5 py-3 shadow-md w-full">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <h3 className="pacifico cursor-pointer text-lg md:text-2xl">Gaurav Bazaar</h3>
        </div>
        {/* Right section */}
        <div className="flex items-center gap-1 lg:gap-4 ">
          <IconButton>
            <SearchIcon />
          </IconButton>
          {isLoggedIn ? (
            <Button className="flex items-center gap-4">
              <Avatar
                src="https://imgs.search.brave.com/nbPZW9ZEP1iytxf1_g32VBP0ZjlDM2IUf9_wdS1fuSo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8xOC8yMS8xMC93/b2xmLTE4MzY4NzVf/NjQwLmpwZw"
              />
              <h3 className="font-semibold hidden lg:block">Gaurav</h3>
            </Button>
          ) : (
            <Button variant="outlined">Login</Button>
          )}
          <IconButton>
            <FavoriteBorder />
          </IconButton>
          <IconButton>
            <AddShoppingCart />
          </IconButton>
          {isLoggedIn && (
            <Button
              startIcon={<Storefront />}
              variant="outlined"
              className="pacifico"
              sx={{ color: 'teal', fontFamily: 'Pacifico,cursive', fontWeight: 400 }}>
              Become Seller
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
