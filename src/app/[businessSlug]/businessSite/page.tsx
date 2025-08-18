"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getBusinessWithRelations } from "@/lib/queries/queries";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";

type Props = {
  params: Promise<{ businessSlug: string }>;
};

export default async function BusinessSite({ params }: Props) {
  const paramsAwait = params instanceof Promise ? await params : params;
  const business = await getBusinessWithRelations(paramsAwait.businessSlug);

  if (!business) {
    return <div>Business not found.</div>;
  }

  return (
    <>
      <header className="flex h-screen w-full flex-col p-4 md:items-center">
        {/* Navigation For Main site in Desktop mode */}
        <nav className="flex w-full max-w-[2000px] justify-between">
          {/* Custom Logo for each business and name of business */}
          <div>
            <img
              src="/images/admin-cleaning-co-logo.png"
              alt="Logo"
              className="h-10 w-10"
            />
          </div>
          {/* Navigation Links : Turn these links into something that can be changes, add smaller componets for this business page.*/}
          <div className="items-center gap-2.5 md:flex md:items-end md:space-x-4">
            <ul className="hidden space-x-4 md:flex">
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Services</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
            <div>
              <Button asChild>
                <Link
                  href="../../login"
                  className="cursor-pointer rounded-md py-3"
                  style={{ backgroundColor: business.brandColorPrimary ?? "" }}
                >
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </nav>

        <div className="h-full w-full sm:px-14 md:max-w-[1800px]">
          <div className="h-full w-full text-center md:flex md:items-center md:justify-center ">
            {/* content */}
            <div className="flex h-full w-full flex-col items-center justify-center gap-5 text-center md:max-w-[900px]">
              <h1 className="text-4xl font-black uppercase md:text-6xl ">
                {business.businessName}
              </h1>
              <p className="max-w-[300px] leading-8 md:max-w-[700px]">
                {business.businessDescription}
              </p>

              {/* UPDATE: a to be Link component. And add some JSX conditionals for when to show something based on screen size. */}
              <Button
                className="cursor-pointer"
                style={{ backgroundColor: business.brandColorPrimary ?? "" }}
                asChild
              >
                <a href="./login">Book Now</a>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main>
        {/* Service Cards */}
        <div
          className="flex h-full flex-col items-center justify-center gap-5 py-20"
          style={{ backgroundColor: business.brandColorPrimary ?? "" }}
        >
          <h2 className="text-3xl font-bold">Hours Of Operation</h2>
          <div className="flex flex-col gap-5 md:flex-row">
            <Card className="w-56 text-center">
              <CardHeader>
                <CardTitle>Monday</CardTitle>
                <CardDescription>
                  {business.operatingHours.monday.isOpen ? "Open" : "Closed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{business.operatingHours.monday.start}AM</p>
                <p>{business.operatingHours.monday.end}PM</p>
              </CardContent>
            </Card>
            <Card className="w-56 text-center">
              <CardHeader>
                <CardTitle>Tuesday</CardTitle>
                <CardDescription>
                  {business.operatingHours.tuesday.isOpen ? "Open" : "Closed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{business.operatingHours.tuesday.start}AM</p>
                <p>{business.operatingHours.tuesday.end}PM</p>
              </CardContent>
            </Card>
            <Card className="w-56 text-center">
              <CardHeader>
                <CardTitle>Wednesday</CardTitle>
                <CardDescription>
                  {business.operatingHours.wednesday.isOpen ? "Open" : "Closed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{business.operatingHours.wednesday.start}AM</p>
                <p>{business.operatingHours.wednesday.end}PM</p>
              </CardContent>
            </Card>
            <Card className="w-56 text-center">
              <CardHeader>
                <CardTitle>Thursday</CardTitle>
                <CardDescription>
                  {business.operatingHours.thursday.isOpen ? "Open" : "Closed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{business.operatingHours.thursday.start}AM</p>
                <p>{business.operatingHours.thursday.end}PM</p>
              </CardContent>
            </Card>
            <Card className="w-56 text-center">
              <CardHeader>
                <CardTitle>Friday</CardTitle>
                <CardDescription>
                  {business.operatingHours.friday.isOpen ? "Open" : "Closed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{business.operatingHours.friday.start}AM</p>
                <p>{business.operatingHours.friday.end}PM</p>
              </CardContent>
            </Card>
            <Card className="w-56 text-center">
              <CardHeader>
                <CardTitle>Saturday</CardTitle>
                <CardDescription>
                  {business.operatingHours.saturday.isOpen ? "Open" : "Closed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{business.operatingHours.saturday.start}AM</p>
                <p>{business.operatingHours.saturday.end}PM</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary w-56 text-center">
              <CardHeader>
                <CardTitle>Sunday</CardTitle>
                <CardDescription>
                  {business.operatingHours.sunday.isOpen ? "Open" : "Closed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{business.operatingHours.sunday.start}</p>
                <p>{business.operatingHours.sunday.end}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex h-full flex-col gap-5 p-20">
          <div>
            <img
              src="/images/admin-cleaning-co-logo.png"
              alt="Logo"
              className="h-30 w-30"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p>{business.contactPersonTitle}</p>
            <p>{business.contactPersonName}</p>
            <a
              href={`mailto:${business.contactPersonEmail}`}
              style={{ color: business.brandColorPrimary ?? "" }}
            >
              {business.contactPersonEmail}
            </a>
            <a
              href={`mailto:${business.contactPersonEmail}`}
              style={{ color: business.brandColorPrimary ?? "" }}
            >
              {business.contactPersonPhone}
            </a>
            <p>{`${business.businessAddressStreet}, ${business.businessAddressCity}, ${business.businessAddressState} ${business.businessAddressZip}`}</p>
          </div>
        </div>
      </main>
      <footer className="w-full text-center">
        <p>
          Powered by{" "}
          <Link
            href="page.tsx"
            style={{ color: business.brandColorSecondary ?? "" }}
          >
            CleanHub
          </Link>
        </p>
      </footer>
    </>
  );
}
