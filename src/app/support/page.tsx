import BlurCircle from "@/components/ui/blur_circle";
import Button from "@/components/ui/button";
import DestinationCard from "@/components/card/destination_card";
import FAQDropdown from "@/components/card/dropdown_card";
import TextInput from "@/components/forms/textbox";
import DateInput from "@/components/forms/dateinput";
import TextArea from "@/components/forms/textarea";

export default function Support() {
  const destinations = [
    {
      imageUrl: "https://source.unsplash.com/400x250/?bali",
      name: "Bali, Indonesia",
      rating: 4.8,
      reviews: 2451,
      description: "Nikmati keindahan pantai dan budaya di pulau Dewata.",
      price: "$899",
      duration: "7 hari",
      isFavorite: true,
    },
    {
      imageUrl: "https://source.unsplash.com/400x250/?paris",
      name: "Paris, France",
      rating: 4.9,
      reviews: 3210,
      description: "Menara Eiffel dan suasana romantis menantimu di Paris.",
      price: "$1200",
      duration: "5 hari",
      isFavorite: false,
    },
  ];

  const faqs = [
    {
      question: "What's included in the travel package?",
      answer: "Our travel package includes round-trip flights, hotel accommodation...",
    },
    {
      question: "What's the cancellation policy?",
      answer: "Free cancellation up to 48 hours before the trip...",
    },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-main">
      <Button text="Search c" showArrow />
      <BlurCircle></BlurCircle>
      <div className="card-box">alsjdialsjdliajsdliasjauuskdhhhhhhhhhhhhhhhhhhhhhhhhh</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-10">
        {destinations.map((dest, index) => (
          <DestinationCard key={index} destination={dest} />
        ))}
      </div>
      <div className="my-20"></div>
      {faqs.map((faq, index) => (
        <FAQDropdown key={index} faq={faq} />
      ))}
      <form>
      <TextInput
        label="Full Name"
        placeholder="Enter your full name"
        helperText="As it appears on your passport"
      />
      
      <TextArea
        label="Special Requests"
        placeholder="Any special requirements..."
      />
      
      <DateInput
        label="Check-in Date"
        helperText="Check-in time starts from 3 PM"
      />
    </form>
    </div>
  );
}
