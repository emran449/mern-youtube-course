import 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'

function AdminHeader({ setOpen}) {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
            <Button onClick={() => setOpen(true)} className ='lg:hidden sm:block'>
                <AlignJustify />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90">
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    )
}

export default AdminHeader
