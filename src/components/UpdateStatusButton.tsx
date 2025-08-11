"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
// Type
type props = {
  bookingId: string;
  newStatus: string;
  currentStatus: string;
  businessSlug: string;
};

export const UpdateStatusButton = ({
  newStatus,
  bookingId,
  currentStatus,
  businessSlug,
}: props) => {
<<<<<<< HEAD
  let update = (status: string, booking: string, message: string) => {
    const styles =
      status === "COMPLETED"
        ? {
            border: "1px solid #00bc7d",
            color: "#00bc7d",
            backgroundColor: "#ddfff4",
          }
        : status === "IN_PROGRESS"
          ? {
              border: "1px solid #ad46ff",
              color: "#ad46ff",
              backgroundColor: "#f0deff",
            }
          : status === "CONFIRMED"
            ? {
                border: "1px solid #2b7fff",
                color: "#2b7fff",
                backgroundColor: "#d1e4ff",
              }
            : {
                border: "1px solid #e7000b",
                color: "#e7000b",
                backgroundColor: "#fad3d5",
              };

    toast(message, { position: "top-center", style: styles });
    // SEND INFORMATION TO API HERE!
    // Status is the new updated status, booking is the bookingId.
    
=======
  let router = useRouter();
  let update = async (status: string, booking: string, message: string) => {
    if (status === "COMPLETED") {
      toast(message, {
        position: "top-center",
        style: {
          border: "1px solid #00bc7d",
          color: "#00bc7d",
          backgroundColor: "#ddfff4",
        },
      });
    } else if (status === "IN_PROGRESS") {
      toast(message, {
        position: "top-center",
        style: {
          border: "1px solid #ad46ff",
          color: "#ad46ff",
          backgroundColor: "#f0deff",
        },
      });
    } else if (status === "CONFIRMED") {
      toast(message, {
        position: "top-center",
        style: {
          border: "1px solid #2b7fff",
          color: "#2b7fff",
          backgroundColor: "#d1e4ff",
        },
      });
    } else {
      toast(message, {
        position: "top-center",
        style: {
          border: "1px solid #e7000b",
          color: "#e7000b",
          backgroundColor: "#fad3d5",
        },
      });
    }
    // SEND INFORMATION TO API HERE!
    // Status is the new updated status, booking is the bookingId.
    try {
      const res = await fetch(`/api/${businessSlug}/business/bookings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });
      if (!res.ok) {
        throw new Error("Error Updating Status");
      }

      router.refresh();
    } catch (error) {
      console.log(error);
    }
>>>>>>> 8f4cc00d8f6dfda79f435c558341765ef8811ef1
  };
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          {/* Update Status To Completed */}
          {currentStatus === "IN_PROGRESS" && (
            <div className="flex justify-end">
              <Button variant="outline" asChild>
<<<<<<< HEAD
                <span>Complete</span>
=======
               <span>Complete</span>
>>>>>>> 8f4cc00d8f6dfda79f435c558341765ef8811ef1
              </Button>
            </div>
          )}
          {/* Update status to In Progress */}
          {currentStatus === "CONFIRMED" && (
<<<<<<< HEAD
            <Button
              variant="outline"
              className="w-full hover:bg-gray-200"
              asChild
            >
=======
            <Button variant="outline" className="w-full hover:bg-gray-200" asChild>
>>>>>>> 8f4cc00d8f6dfda79f435c558341765ef8811ef1
              <span>Begin Work</span>
            </Button>
          )}

          {/* Update status to either Confirmed or Cancelled */}
          {newStatus === "CONFIRMED" && (
            <Button variant="default" className="w-full" asChild>
              <span>Confirm</span>
            </Button>
          )}
<<<<<<< HEAD
          {newStatus === "CANCELLED" && (
=======
          {newStatus === "CANCELED" && (
>>>>>>> 8f4cc00d8f6dfda79f435c558341765ef8811ef1
            <Button variant="destructive" className="w-full" asChild>
              <span>Cancel</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Update</DialogTitle>
            <DialogDescription>
              Please confirm the status update{" "}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose className="flex gap-3">
<<<<<<< HEAD
              <Button variant="outline" asChild>
                <span>Cancel</span>
              </Button>
=======
              <Button variant="outline" asChild><span>Cancel</span></Button>
>>>>>>> 8f4cc00d8f6dfda79f435c558341765ef8811ef1
              {currentStatus === "IN_PROGRESS" && (
                <Button
                  onClick={() =>
                    update(
                      newStatus,
                      bookingId,
                      "Work Order has Been Completed!"
                    )
                  }
                  asChild
                >
                  <span>Update Status</span>
                </Button>
              )}
              {currentStatus === "CONFIRMED" && (
                <Button
                  onClick={() =>
                    update(newStatus, bookingId, "Order Is in Progress")
                  }
                  asChild
                >
                  <span>Update Status</span>
                </Button>
              )}
              {currentStatus === "PENDING" && (
                <Button
                  onClick={() =>
                    update(newStatus, bookingId, `This Has Been ${newStatus}`)
                  }
                  asChild
                >
<<<<<<< HEAD
                  <span>Update Status</span>
=======
                   <span>Update Status</span>
>>>>>>> 8f4cc00d8f6dfda79f435c558341765ef8811ef1
                </Button>
              )}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
