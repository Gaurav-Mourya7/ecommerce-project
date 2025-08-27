import { Box, IconButton, Button, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const isLoggedIn = true;

  return (
    <Box className="shadow-md w-full fixed top-0 left-0 bg-white">
      <div className="flex items-center justify-between p-3 w-full">
        
        {/* Left side */}
        <div className="flex items-center gap-2">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <h3 className="pacifico cursor-pointer text-lg md:text-2xl">Gaurav</h3>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <IconButton>
            <SearchIcon />
          </IconButton>

          {isLoggedIn ? (
            <Button>
            <Avatar
              alt="Profile"
              src="https://imgs.search.brave.com/Vu2AuA_AYJYZpkU0ULEPvXPrfRaV2Nr2N8qcAEkBSyY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8xOC8yMS8xMC93/b2xmLTE4MzY4NzVf/NjQwLmpwZw" 
            /> Gaurav
            </Button>
          ) : (
            <Button variant="outlined">Login</Button>
          )}

        </div>
      </div>
    </Box>
  );
};

export default Navbar;
