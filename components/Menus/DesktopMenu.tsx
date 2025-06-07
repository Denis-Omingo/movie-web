import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import MenuItem from './MenuItem';

export default function DesktopMenu(){
  return (
    <nav className="hidden md:flex gap-4 items-center ">
      <MenuItem title="home" address="/" Icon={AiFillHome} />
      <MenuItem title="about" address="/about" Icon={BsFillInfoCircleFill} />
    </nav>
  );
}
