import React from 'react';
import { Drawer } from 'vaul'; // Import Drawer components
import './MyDrawer.css'; // Custom styles

const MyDrawer = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger>
        <button className="trigger-button">☰ Open Menu</button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />

        <Drawer.Content className="drawer-content">
          <Drawer.Title className="drawer-title">Welcome to My Drawer</Drawer.Title>
          <Drawer.Description className="drawer-description">
            Explore various options and customize your preferences.
          </Drawer.Description>
          <ul className="drawer-options">
            <li><a href="#profile">Profile</a></li>
            <li><a href="#settings">Settings</a></li>
            <li><a href="#logout">Logout</a></li>
          </ul>
          <Drawer.Close>
            <button className="close-button">Close</button>
          </Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MyDrawer;
