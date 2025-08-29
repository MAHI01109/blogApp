import { useState, useEffect } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import QuillTextEditor from "../../components/Common/FormFields/QuillTextEditor";
import ImageUploading from 'react-images-uploading';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


type BlogFormValues = {
  title: string;
  content: string;
  slug: string;
  category: string;
  excerpt: string;
  tags: string;
  thumbnailsImage: string;
  isFeatured: boolean;
}
type CategoryOption = {
  id: string;
  value: string;
  label: string;
};
type ImageType = {
  data_url: string;
  file?: File;
};
type ImageListType = ImageType[];


interface AddOrUpdatePostProps {
  defaultValues?: Partial<BlogFormValues>;
  isEdit?: boolean;
}

const NewBlogSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  slug: yup.string().required("Slug is required"),
  category: yup.string().required("Category is required"),
  excerpt: yup.string().required("Excerpt is required"),
  tags: yup.string().required("Tags are required"),
  thumbnailsImage: yup
    .mixed()
    .test("required", "Cover Image is required", (value) => {
      return value instanceof File || typeof value === "string";
    }).test("fileType", "Unsupported file type", (value) => {
      if (value instanceof File) {
        return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
      }
      return true;
    }),
  isFeatured: yup.boolean(),
});


export default function AddNewPost({
  defaultValues, isEdit = false
}: AddOrUpdatePostProps) {

  const [images, setImages] = useState<ImageListType>([]);
  const [loading, setLoading] = useState(false);
  const [categoryOption, setCategoryOpetion] = useState<CategoryOption[]>([]);

  const form = useForm<BlogFormValues>({
    resolver: yupResolver(NewBlogSchema)
  });

  const onImageChange = (imageList: ImageListType,) => {
    setImages(imageList);
    const imageUrl = imageList[0]?.file || imageList[0]?.data_url || '';
    form.setValue("thumbnailsImage", imageUrl);
  };

  const onSubmit: SubmitHandler<BlogFormValues> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("excerpt", data.excerpt);
    formData.append("tags", data.tags);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("isFeatured", JSON.stringify(data.isFeatured));

    const file = images[0]?.file;
    if (file) {
      formData.append("thumbnailsImage", file);
    } else if (isEdit && data.thumbnailsImage) {
      formData.append("thumbnailsImage", data.thumbnailsImage);
    }
    console.log(data);

    setLoading(true);
    try {
      const url = isEdit ? `/blog/articles/${data.slug}` : "/blog/create-new";
      const method = isEdit ? axios.put : axios.post;
      const response = await method(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success(response.data.message || "Blog saved successfully");
      form.reset();
      setImages([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save blog");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title" && !isEdit) {
        const newSlug = value.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        form.setValue("slug", newSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);


  useEffect(() => {
    if (isEdit && defaultValues?.thumbnailsImage && images.length === 0) {
      setImages([
        {
          data_url: defaultValues.thumbnailsImage,
          file: undefined,
        },
      ]);
    }
  }, [isEdit, defaultValues, images.length]);


  useEffect(() => {
    const fetchCategoryOption = async () => {
      try {
        const res = await axios.get("/blog/category");
        setCategoryOpetion(res.data.categories);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategoryOption();
  }, []);

  return (
    <Card className="p-3">

      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isEdit ? "Edit Blog Post" : "Create New Post"}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {isEdit ? "Update your blog Post" : " Create a new blog Post"}
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" >
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label className="mb-2">Blog Cover Image</Label>
                <ImageUploading
                  value={images}
                  onChange={onImageChange}
                  multiple={false}
                  maxNumber={1}
                  dataURLKey="data_url"
                >
                  {({ onImageUpdate, onImageRemove }) => (
                    <>
                      {
                        images.length === 0 ? (
                          <AspectRatio
                            ratio={16 / 6}
                            className="bg-muted rounded-lg flex items-center justify-center"
                            onClick={() => onImageUpdate(0)} >
                            <div
                              className="md:w-2xl sm:w-lg w-sm h-48 border-2  border-dashed rounded flex flex-col text-center text-muted-foreground items-center justify-center p-4">
                              <Image size={90} />
                              <p className="text-sm">
                                Upload a featured image that visually represents your blog.
                                Ideal size: 1200x600px. Formats: JPG, PNG, or WebP
                              </p>
                            </div>
                          </AspectRatio>
                        ) : (
                          <AspectRatio
                            ratio={16 / 6}
                            className="bg-muted rounded-lg relative">
                            <Button
                              type='button'
                              onClick={() => onImageRemove(0)}
                              variant={'destructive'}
                              size={"icon"}
                              className="absolute top-4 right-4 z-10">
                              <Trash2 />
                            </Button>

                            {
                              <img
                                src={images[0]?.data_url}
                                className="rounded object-cover w-full h-full"
                                alt="Cover Image"
                                onClick={() => onImageUpdate(0)}
                              />
                            }

                          </AspectRatio>
                        )
                      }
                    </>
                  )}
                </ImageUploading>
                <FormMessage />
              </div>

              <div className="grid gap-2">
                <FormField
                  name={"title"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Blog Tilte" {...field} />
                      </FormControl>
                      <FormDescription>
                        *  Enter a short and clear title for your blog.<br />
                        * It should be catchy and represent the content (e.g., "10 Tips for JavaScript Beginners")..
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  name="slug"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Blog Slug" {...field} />
                      </FormControl>
                      <FormDescription>
                        * This will be used in the blog URL (e.g., yourdomain.com/blog/your-slug).<br />
                        * Use lowercase letters, numbers, and hyphens only (no spaces or special characters).
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <QuillTextEditor
                  name="content"
                  control={form.control}
                  label="Blog Content"
                  placeholder="Write your blog here..."
                  rules={{ required: "Content is required" }}
                  description="* Write the full blog content here. Use headings, paragraphs, images, and links to structure your article."
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  name="tags"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="Blog Tags" {...field} />
                      </FormControl>
                      <FormDescription>
                        * Add keywords related to your blog (e.g., JavaScript, React, Web Dev).<br /> * Press Enter after each tag. These help users find your blog.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* excerpt field start here */}
              <div className="grid gap-2">
                <FormField
                  name="excerpt"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Summary</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Blog Short Summary" {...field} />
                      </FormControl>
                      <FormDescription>
                        * Write a short summary (1–3 sentences) of your blog.<br />
                        * This appears on the blog preview and helps readers decide to read more..
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* category field start here */}

              <div className="grid gap-2">
                <FormField
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.id}
                        defaultValue={field.id}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the most relevant category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            categoryOption?.map((item) => (
                              <SelectItem key={item?.id} value={item?.id}>{item?.label}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        * Select the most relevant category for your blog post (e.g., Programming, Lifestyle, Business).<br />
                        * Categories help organize blogs.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* isFeatured field start here */}
              <div className="grid gap-2">
                <FormField
                  name="isFeatured"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mark as Featured</FormLabel>
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormDescription>
                          Enable this if you want to mark the blog as “Featured”.<br />
                        </FormDescription>
                      </div>
                      <FormDescription>* Featured blogs get special placement on the homepage.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </div>

          </CardContent>

          <CardFooter className="space-y-6">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 rounded hover:bg-blue-700  text-white "
            >
              {loading ? "Submitting..." : isEdit ? "Update Blog" : "Create Blog"}
            </Button>
          </CardFooter>

        </form>
      </Form>
    </Card>
  );
}
