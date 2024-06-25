import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
 
 
  
 
  export default function Grid() {
    return (
       <div className="flex overflow-x-auto">
         <Table className="bg-white overflow-x-auto    rounded-lg mt-12">
        <TableHeader>
          <TableRow className="text-[13px]">
            <TableHead className="w-[100px]">Timing</TableHead>
            <TableHead className="">Monday</TableHead>
            <TableHead>Tuesday</TableHead>
            <TableHead>Wednesday</TableHead>
            <TableHead>Thursday</TableHead>
            <TableHead>Friday</TableHead>
            <TableHead>Saturday</TableHead>
            <TableHead className="text-right">Sunday</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
         
            <TableRow className="text-[12px]">
              <TableCell className="w-[100px] py-2 px-2 bg-lightGreen text-white">
               
               8-10AM
              </TableCell>
              <TableCell className="text-[13px] font-semibold "></TableCell>
              <TableCell className="text-[13px] font-semibold bg-green-400"></TableCell>
              <TableCell
                
              >
               
              </TableCell>
  
              <TableCell className="text-[13px] bg-green-400 font-semibold"></TableCell>
              <TableCell className="bg-green-400  cursor-pointer">
             
              </TableCell>
              <TableCell className="cursor-pointer">
             
             </TableCell>
             <TableCell className="cursor-pointer bg-orange-400">
             
             </TableCell>
            </TableRow>
             {/* second row */}
            <TableRow className="text-[12px]">
              <TableCell className="w-[100px] bg-lightGreen text-white">
               
               10-12PM
              </TableCell>
              <TableCell className="text-[13px] font-semibold"></TableCell>
              <TableCell className="text-[13px] font-semibold bg-green-400"></TableCell>
              <TableCell className=""
                
              >
               
              </TableCell>
  
              <TableCell className="text-[13px] bg-green-400 font-semibold "></TableCell>
              <TableCell className="bg-green-400 cursor-pointer">
             
              </TableCell>
              <TableCell className="cursor-pointer">
             
             </TableCell>
             <TableCell className="cursor-pointer bg-orange-400">
             
             </TableCell>
            </TableRow>
             {/* third row */}
             <TableRow className="text-[12px]">
              <TableCell className="w-[100px] bg-lightGreen text-white">
               
               12-2PM
              </TableCell>
              <TableCell className="text-[13px] font-semibold"></TableCell>
              <TableCell className="text-[13px] font-semibold"></TableCell>
              <TableCell className="bg-green-400"
                
              >
               
              </TableCell>
  
              <TableCell className="text-[13px] bg-green-400 font-semibold"></TableCell>
              <TableCell className="flex justify-end text-[14px]  text-lightGreen cursor-pointer">
             
              </TableCell>
              <TableCell className="cursor-pointer">
             
             </TableCell>
             <TableCell className="cursor-pointer bg-orange-400">
             
             </TableCell>
            </TableRow>
             {/* fourth row */}
             <TableRow className="text-[12px]">
              <TableCell className=" bg-lightGreen text-white">
               
               2-4PM
              </TableCell>
              <TableCell className="text-[13px] font-semibold"></TableCell>
              <TableCell className="text-[13px] font-semibold"></TableCell>
              <TableCell className="bg-green-400"
                
              >
               
              </TableCell>
  
              <TableCell className="text-[13px] bg-green-400 font-semibold"></TableCell>
              <TableCell className="flex justify-end text-[14px]  text-lightGreen cursor-pointer">
             
              </TableCell>
              <TableCell className="cursor-pointer bg-green-400">
             
             </TableCell>
             <TableCell className="cursor-pointer bg-orange-400">
             
             </TableCell>
            </TableRow>
             {/* fifth row */}
             <TableRow className="text-[12px]">
              <TableCell className="w-[100px] bg-lightGreen text-white">
               
               4-6PM
              </TableCell>
              <TableCell className="text-[13px] font-semibold"></TableCell>
              <TableCell className="text-[13px] font-semibold"></TableCell>
              <TableCell
                
              >
               
              </TableCell>
  
              <TableCell className="text-[13px] bg-green-400 font-semibold"></TableCell>
              <TableCell className="bg-green-400 cursor-pointer">
             
              </TableCell>
              <TableCell className="cursor-pointer bg-green-400">
             
             </TableCell>
             
             <TableCell className="cursor-pointer bg-orange-400">
             
             </TableCell>
            </TableRow>
             {/* sixth row */}
             <TableRow className="text-[12px]">
              <TableCell className="w-[100px] bg-lightGreen text-white">
               
               6-8PM
              </TableCell>
              <TableCell className="text-[13px] font-semibold"></TableCell>
              <TableCell className="text-[13px] font-semibold"></TableCell>
              <TableCell
                
              >
               
              </TableCell>
  
              <TableCell className="text-[13px] bg-green-400 font-semibold"></TableCell>
              <TableCell className="cursor-pointer bg-green-400 ">
             
              </TableCell>
              <TableCell className="cursor-pointer ">
             
             </TableCell>
             <TableCell className="cursor-pointer bg-orange-400">
             
             </TableCell>
            </TableRow>
        
        </TableBody>
      </Table>

       </div>
       

       
      
    );
  }
  