import {
    Table,
    TableBody,
    TableCell,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
 
  
  import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";
import Link from "next/link";
  
  const TransactionType = [
    {
      id: "1",
      icon: "/teacher1.jpg",
      name: "Rotimi Wajabs",
      type: "Tuition Fee",
      student: "Student",
      date: "April 20, 2024",
      amount_add: "+$17.50",
    },
    {
      id: "2",
      icon: "/parent1.jpg",
      name: "Adeniran James",
      type: "Tuition Fee",
      parent: "Parent",
      date: "April 19, 2024",
      amount_add: "+$14.50",
    },
    {
        id: "3",
        icon: "/logo.png",
        name: "Rotimi Wajabs",
      type: "Withdrawal",
      user: "User",
      date: "April 20, 2024",
      amount_withdraw: "-$570.50",
      },
      {
        id: "4",
        icon: "/logo.png",
        name: "Rotimi Wajabs",
      type: "Withdrawal",
      user: "User",
      date: "April 20, 2024",
      amount_withdraw: "-$570.50",
      },
  ];
  
  export default function TransactionTable() {
    return (
      <Table className="bg-white overflow-x-auto p-6   rounded-md my-4">
        <TableCaption className="px-3  py-3 rounded-md bg-white">
            <div className="flex font-semibold  justify-between">
                <p>Recent Transactions</p> 
                <Link href="/" className="text-[11.5px] font-semibold text-right text-lightGreen ">
            View More
          </Link>
            </div>
           
          </TableCaption>
        
        <TableHeader>
           
            
        
           
          
             
         
        
           
       
            
            
          <TableRow className="mt-0 text-[12.5px]">

            <TableHead>Name</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TransactionType.map((Transaction) => (
            <TableRow key={Transaction.id} className="">
              <TableCell className="font-semibold w-[200px] text-[13px] flex  mr-1">
                <Image
                  src={Transaction.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[30px] h-[30px] mt-2 rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div className="text-[12px]">{Transaction.name}</div>
                  <div className="flex  mt-1 justify-between">
                    <p
                      className={`${
                        Transaction.student
                          ? "text-[10px] px-[10px] py-[2px] rounded-md mr-3 bg-lightGreen text-white"
                          : Transaction.parent ? "text-[10px] px-[10px] py-[2px] rounded-md mr-3 bg-gold text-white" : "text-[10px] px-[15px] py-[2px] rounded-md mr-3 bg-dimOrange text-white"
                      }`}
                    >
                      {Transaction.student || Transaction.parent || Transaction.user}
                    </p>
                    
                  </div>
                </div>
              </TableCell>
             
              <TableCell className="text-[12px] font-semibold">{Transaction.type}</TableCell>
              <TableCell className="text-[12px]   font-semibold">{Transaction.date}</TableCell>
              <TableCell className="">
              <p
                      className={`${
                        Transaction.amount_add
                          ? " text-lightGreen font-semibold text-[12px]"
                           : "text-red-500 font-semibold text-[12px]"
                      }`}
                    >
                      {Transaction.amount_add || Transaction.amount_withdraw}
                    </p>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  