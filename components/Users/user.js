'use client'
import {useState, useEffect} from 'react'
import { GrMail,GrUserAdmin } from "react-icons/gr";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSession } from 'next-auth/react'
import {defaultUserPic} from '@/utilities/defaults'
import Image from 'next/image'
import { getUsers, deleteUser} from '@/app/actions'
import { useSearchParams, useRouter } from 'next/navigation'
import { Modal, Button, Heading, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { EditProfile } from '../forms/editProfile';
export const Users = ({initialUsers}) => {
    
    const [users, setUsers] = useState(initialUsers)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const {data: session} = useSession()
    const router = useRouter()
    const params = useSearchParams();
    const { isOpen, onOpen, onClose } = useDisclosure()

    let newUserParam = params.get('newUser');

   
    useEffect(() => {
        if(session){
            setIsSuperAdmin(prev=>session.user?.role?.isSuperAdmin)    
        }
    }, [session])

    const fetchUsers = async () => {
        const users = await getUsers();
        setUsers(users);
    }
    const handleEdit = (e, updatedUser) => {
        console.log(e.target.id, 'edit button clicked')
        console.log(updatedUser, 'updated user data')
        if (updatedUser){
           return setUsers(prev=>{
                const newUsers = prev.map(user=>{
                    if (user._id === updatedUser._id){
                        return updatedUser
                    }
                    return user
                })
                return newUsers;
            })
        }
    }
    const handleDelete = async (e) => {
        const id = e.target.id;
        if (id !== ''){
            setLoading(prev=>({...prev, [id]: true}));

            try {
                 const deleted = await deleteUser(id)
            //    console.log(deleted, 'user deleted')
                  setUsers(prev=>prev.filter(user=>user._id !== id))
                 setLoading(prev=>({...prev, [id]: false}));
            } catch (error) {
                console.log(error, 'error occured')
                setLoading(prev=>({...prev, [id]: false}));
            }
        }
        
    }

    const getDeletedUser = async (id) => {
        const deleted = await deleteUser(id);
        return deleted;
    }

    return (
        <div className="p-5 bg-slate-50 rounded-lg min-w-[100%]">
            <Heading>Users</Heading>
                        
            {users.map((user) => {
             
               return (
                <div key={user._id} className="my-5 flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <Image src={user.image?.src || defaultUserPic} alt="Profile-Image" className="p-1 rounded-full" width={75} height={75} />
                    <h1 className="text-2xl">{user.name}</h1>
                    </div>
                    
                    <p className='flex gap-2 items-center text-lg'><GrMail className="flex self-center" />{user.email}</p>
                    
                    <div className="flex  gap-4 mb-3">
                        <p className='flex gap-2 items-center text-lg'><GrUserAdmin className="flex self-center"/>{user.role.isSuperAdmin ? 'Super Admin': 'Admin'}</p>
                        {/* <Button id={user._id} isDisabled={!isSuperAdmin} onClick={handleEdit} leftIcon={<LiaUserEditSolid  className="text-2xl mr-[-8px]" id={user._id}/>}></Button> */}
                        <EditUserModal id={user._id} user={user} handleEdit={handleEdit}/>
                        <Button id={user._id} isLoading={loading[user._id]} isDisabled={!isSuperAdmin} onClick={handleDelete} leftIcon={<RiDeleteBin6Line className="text-2xl mr-[-7px]" id={user._id} />}></Button>
                    </div>
                  <hr></hr>
                </div>
            )})}
        </div>
    )
}

function EditUserModal({user, handleEdit}) {
    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )
  
    const OverlayTwo = () => (
      <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'
      />
    )
  
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [overlay, setOverlay] = useState(<OverlayOne />)
  
    return (
      <>
      
        <Button
            id={user._id}
          ml='4'
          onClick={(e) => {
            setOverlay(<OverlayTwo />)
            onOpen()
            handleEdit(e)
          }}
        >
<LiaUserEditSolid  className="text-2xl mr-[-8px]" id={user._id}/>        
</Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <EditProfile user={user} handleEdit={handleEdit} onClose={onClose}/> 
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
