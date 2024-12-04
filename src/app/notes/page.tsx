import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button"

const excalidrawFiles = [
  {
    id: 1,
    name: "Compiler Design Note1",
    lastModified: "14/01/2024",
  },
]

const Page = () => {
  return (
    <Table>
      <TableCaption>Your Notes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={5}>Note Name</TableHead>
          <TableHead colSpan={3}>Last modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {excalidrawFiles.map((e) => (
          <TableRow key={e.id}>
            <TableCell colSpan={5} className="font-medium">{e.name}</TableCell>
            <TableCell colSpan={3}>{e.lastModified}</TableCell>
            <TableCell colSpan={3}><Button>Edit</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Page;

