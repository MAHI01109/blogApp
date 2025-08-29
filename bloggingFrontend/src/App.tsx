import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { PublicRoute } from "@/utils/PublicRoute";
import { ThemeProvider } from "@/components/theme-provider";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import ScrollToTop from "@/components/Common/ScrollToTop";


// Authintiaction PAGES
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
// Public Routes
const Home = lazy(() => import("@/pages/Home/Home"));
const About = lazy(() => import("@/pages/About/About"));
const Blog = lazy(() => import("@/pages/Blog/Blog"))
const Blogs = lazy(() => import("@/pages/Blog/Blogs"))
const ContactUs = lazy(() => import("@/pages/Contact/ContactUs"));
const Faq = lazy(() => import("@/pages/Faq"));

// user dashbord imports (proteded Routes )
const DashboardLayout = lazy(() => import("@/pages/Dashboard/Layout"));
const DashboardOverview = lazy(() => import("./pages/Dashboard/DashboardOverview"));
const Post = lazy(() => import("@/pages/Dashboard/Post"));
const Search = lazy(() => import("@/pages/Dashboard/Search"));
const AddNewPost = lazy(() => import("@/pages/Dashboard/AddNewPost"));
const UserBlogs = lazy(() => import("@/pages/Dashboard/UserBlogs"));
const UserProfile = lazy(() => import("@/pages/Dashboard/UserProfile"));
const CommentsPage = lazy(() => import("@/pages/Dashboard/CommentsPage"));
const GalleryPage = lazy(() => import("@/pages/Dashboard/GalleryPage"));



export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const loginRoute = location.pathname.startsWith("/login");
  const registerRoute = location.pathname.startsWith("/register");
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        {!isAdminRoute && !loginRoute && !registerRoute && <Navbar />}
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog-view/:slug" element={<Blog />} />
            <Route path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/admin"
              element={
                // <ProtectedRoute>
                <DashboardLayout />
                // </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="post" element={<UserBlogs />} />
              <Route path="search" element={<Search />} />
              <Route path="add-post" element={<AddNewPost />} />
              <Route path="user-blogs" element={<UserBlogs />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="comments" element={<CommentsPage />} />
              <Route path="gallary" element={<GalleryPage />} />
            </Route>
          </Routes>
        </div>
        {!isAdminRoute && !loginRoute && !registerRoute && <Footer />}
      </Suspense>
    </ThemeProvider>
  );
}
