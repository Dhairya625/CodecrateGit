import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Make sure this is imported
import { CardSpotlight } from "../ui/card-spotlight";
import { AnimatePresence, motion } from "framer-motion";

// Main component
export default function CardSpotlightDemo() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#DEDED1]">
      {/* Foreground Card */}
      <CardSpotlight className="h-auto w-full max-w-md p-6 md:p-8">
        <p className="text-2xl font-bold relative z-20 mt-2 text-[#5a5348]">
          Let's Start Studying!
        </p>
        <div className="text-[#7a7368] mt-4 relative z-20">
          Follow these steps to secure your account:
          <ul className="list-none mt-2 space-y-2">
            <Step title="Enter your email address" />
            <Step title="Create a strong password" />
            <Step title="Set up two-factor authentication" />
            <Step title="Verify your identity" />
          </ul>
        </div>
        <p className="text-[#7a7368] mt-6 relative z-20 text-sm">
          Ensuring your account is properly secured helps protect your personal
          information and data.
        </p>

        {/* Study Room Options */}
        <div className="mt-8 relative z-20 flex flex-col gap-4">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="bg-[#B6AE9F] hover:bg-[#a0988a] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Create Study Room
          </button>
          <button
            onClick={() => setJoinModalOpen(true)}
            className="bg-white border border-[#C5C7BC] text-[#5a5348] font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:border-[#B6AE9F]"
          >
            Join Study Room
          </button>
        </div>
      </CardSpotlight>

      {/* Modals for Create and Join Room */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <JoinRoomModal
        isOpen={isJoinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </div>
  );
}

// Modal for Creating a Study Room with navigation
const CreateRoomModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page
    // You can add logic here to handle the form data
    console.log("Creating room...");
    navigate("/Classroom"); // Navigate to the classroom page after submission
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-[#F8F8F3] border border-[#C5C7BC] rounded-2xl w-full max-w-md p-6 md:p-8 text-[#5a5348] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Back Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#7a7368] hover:text-[#5a5348] text-lg font-bold focus:outline-none"
              aria-label="Back"
              type="button"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-[#5a5348]">Create a New Study Room</h2>
            <form onSubmit={handleCreateRoom} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Classroom Name"
                className="bg-white border border-[#C5C7BC] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B6AE9F] focus:border-[#B6AE9F] transition text-[#5a5348]"
                required
              />
              <input
                type="text"
                placeholder="Classroom Code"
                className="bg-white border border-[#C5C7BC] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B6AE9F] focus:border-[#B6AE9F] transition text-[#5a5348]"
                required
              />
              <input
                type="number"
                placeholder="Number of Members"
                className="bg-white border border-[#C5C7BC] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B6AE9F] focus:border-[#B6AE9F] transition text-[#5a5348]"
                required
              />
              <button
                type="submit"
                className="bg-[#B6AE9F] hover:bg-[#a0988a] text-white font-medium py-3 px-4 rounded-lg mt-4 transition-all duration-200 transform hover:scale-105"
              >
                Create Room
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Modal for Joining a Study Room with navigation
const JoinRoomModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page
    // You can add logic here to validate the room code
    console.log("Joining room...");
    navigate("/Classroom"); // Navigate to the classroom page after submission
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-[#F8F8F3] border border-[#C5C7BC] rounded-2xl w-full max-w-md p-6 md:p-8 text-[#5a5348] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Back Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#7a7368] hover:text-[#5a5348] text-lg font-bold focus:outline-none"
              aria-label="Back"
              type="button"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-[#5a5348]">Join an Existing Room</h2>
            <form onSubmit={handleJoinRoom} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Class Name"
                className="bg-white border border-[#C5C7BC] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B6AE9F] focus:border-[#B6AE9F] transition text-[#5a5348]"
                required
              />
              <input
                type="text"
                placeholder="Class Code"
                className="bg-white border border-[#C5C7BC] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B6AE9F] focus:border-[#B6AE9F] transition text-[#5a5348]"
                required
              />
              <button
                type="submit"
                className="bg-[#B6AE9F] hover:bg-[#a0988a] text-white font-medium py-3 px-4 rounded-lg mt-4 transition-all duration-200 transform hover:scale-105"
              >
                Join Room
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// Helper component for list items
const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-3 items-start">
      <CheckIcon />
      <p className="text-[#5a5348]">{title}</p>
    </li>
  );
};

// Helper component for the check icon
const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24"
      fill="currentColor"
      className="h-5 w-5 text-[#B6AE9F] mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l-.046 -.553l-.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
