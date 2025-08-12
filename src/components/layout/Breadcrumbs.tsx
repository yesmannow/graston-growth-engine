import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

// A map for friendlier breadcrumb names
const breadcrumbNameMap: { [key: string]: string } = {
  admin: 'Admin',
  staff: 'Staff',
  provider: 'Provider',
  update: 'Update Profile',
  toolkit: 'Marketing Toolkit',
  directory: 'Directory',
  compare: 'Compare',
  onboarding: 'Onboarding',
  reports: 'Reports',
  support: 'Support',
  about: 'About',
  faq: 'FAQ',
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on the homepage
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto py-4 px-4 md:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const displayName = breadcrumbNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

            return (
              <React.Fragment key={to}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-medium">{displayName}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={to}>{displayName}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;