"use client";

import { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/shared/PageHeader";
import CategoryForm from "@/components/admin/CategoryForm";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const { toast } = useToast();

  async function fetchCategories() {
    try {
      const data = await getCategories();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (formData) => {
    setFormLoading(true);
    try {
      await createCategory(formData);
      toast({ title: "Category Created!" });
      setFormOpen(false);
      fetchCategories();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    setFormLoading(true);
    try {
      await updateCategory(editData.id, formData);
      toast({ title: "Category Updated!" });
      setEditData(null);
      fetchCategories();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteId);
      toast({ title: "Category Deleted" });
      fetchCategories();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="Manage Categories" description="Add, edit, or remove skill categories" className="mb-0" />
        <Button onClick={() => setFormOpen(true)} className="bg-gold-400 text-black hover:bg-gold-500">
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {categories.length === 0 ? (
            <EmptyState title="No Categories" description="Create your first skill category." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => {
                  const attrs = cat.attributes || cat;
                  return (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{attrs.name}</TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {attrs.description || "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{attrs.icon || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditData({ id: cat.id, name: attrs.name, description: attrs.description || "", icon: attrs.icon || "" })}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                            onClick={() => setDeleteId(cat.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Form */}
      <CategoryForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreate}
        loading={formLoading}
      />

      {/* Edit Form */}
      {editData && (
        <CategoryForm
          open={!!editData}
          onOpenChange={() => setEditData(null)}
          onSubmit={handleUpdate}
          initialData={editData}
          loading={formLoading}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText="Delete"
        destructive
      />
    </div>
  );
}
