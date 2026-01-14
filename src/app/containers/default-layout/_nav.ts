export const navItems: any[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: 'pi pi-home',  // Home icon for Dashboard
    badge: {
      color: 'info',
    },
  },
  {
    name: 'Banques',
    iconComponent: 'pi pi-building',  // Building icon for Banques
    children: [
      {
        name: 'Banques',
        url: '/banque/banques',
        iconComponent: 'pi pi-credit-card',  // Credit card icon for Banques
      },
    ],
  },
  {
    name: 'Company',
    iconComponent: 'pi pi-briefcase',  // Briefcase icon for Company
    children: [
      {
        name: 'Companies',
        url: '/company/company',
        iconComponent: 'pi pi-building',  // Building icon for Companies
      },
    ],
  },
  {
    name: 'Product',
    iconComponent: 'pi pi-cog',  // Gear icon for products (or relevant product icon)
    children: [
      {
        name: 'Items',
        url: '/product/items',
        iconComponent: 'pi pi-box',  // Box icon for product items
      },
    ],
  },
  {
    name: 'Sales',
    iconComponent: 'pi pi-dollar',  // Dollar icon for Sales
    children: [
      {
        name: 'Clients',
        url: '/sales/clients',
        iconComponent: 'pi pi-user',  // User icon for Clients
      },
      {
        name: 'Quotes',
        url: '/sales/quotes-devis',
        iconComponent: 'pi pi-file',  // File icon for Quotes
      },
      {
        name: 'Invoices',
        url: '/sales/invoice',
        iconComponent: 'pi pi-file-o',  // File icon variant for Invoices
      },
    ],
  },
  {
    name: 'Purchases',
    iconComponent: 'pi pi-shopping-cart',  // Shopping cart icon for Purchases
    children: [
      {
        name: 'Vendors',
        url: '/purchase/vendors',
        iconComponent: 'pi pi-store',  // Store icon for Vendors
      },
      {
        name: 'Bills',
        url: '/purchase/bills',
        iconComponent: 'pi pi-file',  // File icon for Bills
      },
    ],
  },
  {
    name: 'Time Tracking',
    iconComponent: 'pi pi-clock',  // Clock icon for Time Tracking
    children: [
      {
        name: 'Tasks',
        url: '/time-tracking/projects',
        iconComponent: 'pi pi-tasks',  // Tasks icon for Tasks
      },
      {
        name: 'Reports',
        url: '/time-tracking/reports',
        iconComponent: 'pi pi-chart-line',  // Chart icon for Reports
      },
      {
        name: 'Timesheet',
        url: '/time-tracking/timesheets',
        iconComponent: 'pi pi-chart-line',  // Chart icon for Timesheets
      },
    ],
  },
  {
    name: 'User Manager',
    iconComponent: 'pi pi-users',  // Users icon for managing users
    children: [
      {
        name: 'User Management',
        url: '/usermanager/usermanager',
        iconComponent: 'pi pi-user',  // User icon for managing users
      },
    ],
  },
];
