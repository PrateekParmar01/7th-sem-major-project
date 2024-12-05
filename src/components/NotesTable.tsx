"use client"
import axios from "axios"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

type Props = {
  userId: string
}

type ExcalidrawFile = {
  name: string,
  id: string,
  updatedAt: string
}

const NotesTable = ({ userId }: Props) => {
  const [excalidrawFiles, setExcalidrawFiles] = useState<ExcalidrawFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(excalidrawFiles);

  // TODO add pagination
  // runs on mount and every time add button is clicked
  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      const { data: excalidrawFiles } = await axios.get(`/api/notes/${userId}`)
      if (active)
        setExcalidrawFiles(excalidrawFiles);
    }
    fetchData().catch(err => {
      console.log(err);
    })
    return () => {
      active = false;
    }
  }, [userId, isLoading]);

  const handleAddOnClick = async () => {
    setIsLoading(true);
    try {
      await axios.post(`/api/notes/${userId}`, {});
    } catch(error) {
      console.log("Error adding content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={5}>Name</TableHead>
            <TableHead colSpan={3}>Last modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {excalidrawFiles.map((e) => (
            <TableRow key={e.id}>
              <TableCell colSpan={5} className="font-medium">{e.name}</TableCell>
              <TableCell colSpan={3}>{e.updatedAt}</TableCell>
              <TableCell colSpan={3}><Button><Link href={`/notes/edit/${e.id}`}>Edit</Link></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button disabled={isLoading} variant="outline" size="icon" className="justify-self-end" onClick={handleAddOnClick}>
        <PlusIcon />
      </Button>
    </div>
  )
}

export default NotesTable;