"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Download, Loader2, Instagram as InstagramIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { downloadFile } from "@/lib/utils";
import { getHttpErrorMessage } from "@/lib/http";

import { useInstagramVideoInfo, useTikTokVideoInfo } from "@/services/api/queries";

const instagramSchema = z.object({
  postUrl: z.string().url({
    message: "Geçerli bir Instagram bağlantısı giriniz",
  }),
});

const tiktokSchema = z.object({
  postUrl: z.string().url({
    message: "Geçerli bir TikTok bağlantısı giriniz",
  }),
});

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 8.5V2h-6.5" />
    <path d="M16.5 2H8.54a4.46 4.46 0 1 0 0 8.92V17a4.5 4.5 0 1 0 8.95.23h.05V8.5Z" />
  </svg>
);

export function DownloaderForm() {
  const instagramForm = useForm<z.infer<typeof instagramSchema>>({
    resolver: zodResolver(instagramSchema),
    defaultValues: {
      postUrl: "",
    },
  });

  const tiktokForm = useForm<z.infer<typeof tiktokSchema>>({
    resolver: zodResolver(tiktokSchema),
    defaultValues: {
      postUrl: "",
    },
  });

  const {
    error: instaError,
    isPending: isInstaPending,
    mutateAsync: getInstaVideoInfo,
  } = useInstagramVideoInfo();

  const {
    error: tiktokError,
    isPending: isTiktokPending,
    mutateAsync: getTiktokVideoInfo,
  } = useTikTokVideoInfo();

  const httpInstaError = getHttpErrorMessage(instaError);
  const httpTiktokError = getHttpErrorMessage(tiktokError);

  async function onInstagramSubmit(values: z.infer<typeof instagramSchema>) {
    const { postUrl } = values;
    try {
      const videoInfo = await getInstaVideoInfo({ postUrl });
      const { filename, videoUrl } = videoInfo;
      downloadFile(videoUrl, { filename });
    } catch (error: any) {
      console.log(error);
    }
  }

  async function onTiktokSubmit(values: z.infer<typeof tiktokSchema>) {
    const { postUrl } = values;
    try {
      const videoInfo = await getTiktokVideoInfo({ postUrl });
      const { data } = videoInfo;
      downloadFile(data.hdplay, { filename: data.title });
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div className="w-full overflow-hidden shadow-xl bg-white dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl transition-all duration-300 hover-lift gradient-border">
      <Tabs defaultValue="instagram" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="instagram">
            <InstagramIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="tiktok">
            <TiktokIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            TikTok
          </TabsTrigger>
        </TabsList>
        <TabsContent value="instagram">
          <div className="p-4 md:p-6 lg:p-8 pt-2 md:pt-3">
            <Form {...instagramForm}>
              <form
                onSubmit={instagramForm.handleSubmit(onInstagramSubmit)}
                className="flex flex-col gap-3 md:gap-4"
              >
                <div className="mb-1 md:mb-2 h-6 w-full px-2 text-start text-red-500 min-h-[24px] text-sm">
                  {httpInstaError}
                </div>
                <FormField
                  control={instagramForm.control}
                  name="postUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative">
                          <Input
                            disabled={isInstaPending}
                            type="url"
                            placeholder="Instagram bağlantısını yapıştırın..."
                            className="h-12 md:h-14 w-full pl-3 pr-3 md:pl-4 md:pr-4 border-2 rounded-xl border-blue-200 dark:border-blue-900/30 focus:border-blue-500 dark:focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base focus:ring-2 focus:ring-blue-500/50"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs md:text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isInstaPending}
                  type="submit"
                  className="mt-1 md:mt-2 h-12 md:h-14 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 text-white rounded-xl font-medium text-base md:text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                  {isInstaPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-5 w-5" />
                  )}
                  İndir
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>
        <TabsContent value="tiktok">
          <div className="p-4 md:p-6 lg:p-8 pt-2 md:pt-3">
            <Form {...tiktokForm}>
              <form
                onSubmit={tiktokForm.handleSubmit(onTiktokSubmit)}
                className="flex flex-col gap-3 md:gap-4"
              >
                <div className="mb-1 md:mb-2 h-6 w-full px-2 text-start text-red-500 min-h-[24px] text-sm">
                  {httpTiktokError}
                </div>
                <FormField
                  control={tiktokForm.control}
                  name="postUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative">
                          <Input
                            disabled={isTiktokPending}
                            type="url"
                            placeholder="TikTok bağlantısını yapıştırın..."
                            className="h-12 md:h-14 w-full pl-3 pr-3 md:pl-4 md:pr-4 border-2 rounded-xl border-blue-200 dark:border-blue-900/30 focus:border-blue-500 dark:focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base focus:ring-2 focus:ring-blue-500/50"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs md:text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isTiktokPending}
                  type="submit"
                  className="mt-1 md:mt-2 h-12 md:h-14 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 text-white rounded-xl font-medium text-base md:text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                  {isTiktokPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-5 w-5" />
                  )}
                  İndir
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
