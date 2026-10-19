import { adminSidebarMenuItems } from "@/config";
import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function MenuItems({ setOpen }) {
 const navigate = useNavigate();

  return <nav className="mt-8 flex flex-col gap-2">
    {
      adminSidebarMenuItems.map(menuItem => <div onClick={() => {
        navigate(menuItem.path);
        setOpen(false);
      }} key={menuItem.label} className="flex text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted cursor-pointer hover:text-foreground">
        {<menuItem.icon className="h-5 w-5" />}
        <span className="text-sm font-medium">{menuItem.label}</span>
      </div>)
    }
  </nav>
  
}

function AdminSideBar({open, setOpen}) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className='boarder-b'>
              <SheetTitle className="flex items-center gap-2 text-primary">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
              </SheetTitle>

            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>


      <aside className="hidden w-64 flex-col border-r bg-background lg:flex p-6">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}
export default AdminSideBar;
