"use client";

import { useEffect, useState } from "react";
import { getAllUsers, blockUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/shared/PageHeader";
import UsersTable from "@/components/admin/UsersTable";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function fetchUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockToggle = async (userId, blocked) => {
    try {
      await blockUser(userId, blocked);
      toast({ title: blocked ? "User Blocked" : "User Unblocked" });
      fetchUsers();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Manage Users" description="View and manage all registered users" />
      <Card className="border-border/50">
        <CardContent className="p-0">
          {users.length === 0 ? (
            <EmptyState title="No Users" description="No registered users yet." />
          ) : (
            <UsersTable users={users} onBlockToggle={handleBlockToggle} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
