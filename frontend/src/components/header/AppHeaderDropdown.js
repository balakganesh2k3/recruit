import React from 'react';
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import {
  cilLockLocked,
  cilSettings,
  cilUser,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import avatar8 from './../../assets/images/avatars/8.jpg';
import { useNavigate } from 'react-router-dom'; // Import the navigation hook

const AppHeaderDropdown = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleProfileClick = () => {
    navigate('/profile'); // Redirect to the profile page
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem onClick={handleProfileClick}> {/* Trigger navigation */}
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
       
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
