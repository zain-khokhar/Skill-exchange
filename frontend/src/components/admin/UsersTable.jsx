"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldOff } from "lucide-react";

export default function UsersTable({ users, onBlockToggle }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell className="text-muted-foreground">{user.email}</TableCell>
            <TableCell>
              {user.isAdmin ? (
                <Badge className="bg-gold-400/10 text-gold-400 border-gold-400/20">Admin</Badge>
              ) : (
                <Badge variant="secondary">User</Badge>
              )}
            </TableCell>
            <TableCell>
              {user.blocked ? (
                <Badge variant="destructive">Blocked</Badge>
              ) : (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
              )}
            </TableCell>
            <TableCell>
              {!user.isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBlockToggle(user.id, !user.blocked)}
                  className={user.blocked ? "text-green-400 hover:text-green-300" : "text-red-400 hover:text-red-300"}
                >
                  {user.blocked ? (
                    <><Shield className="h-4 w-4 mr-1" /> Unblock</>
                  ) : (
                    <><ShieldOff className="h-4 w-4 mr-1" /> Block</>
                  )}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
