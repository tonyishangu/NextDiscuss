import Link  from 'next/link'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    Button,
    Avatar
} from '@nextui-org/react'
// check authentication
import { auth } from '@/auth'

export default async function Header() {
    const session = await auth()

    return (
        <Navbar className='shadow mb-6'>
            <NavbarBrand>
                <Link href='/' className='font-bold'>Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <NavbarItem>
                    <Input />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <NavbarItem>
                {session?.user? 'Signed In' : 'Signed Out'  }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}