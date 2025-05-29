
import React, { useState } from 'react';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ReservationScreen = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', {
      date,
      time,
      people,
      notes
    });
  };

  return (
    <div className="min-h-screen bg-white font-playfair">
      {/* Navbar */}
      <nav className="bg-wine-900 text-white py-4 px-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center tracking-wide">
            Bella Vista Restaurant
          </h1>
        </div>
      </nav>

      {/* Restaurant Image */}
      <div className="w-full h-48 md:h-56 relative overflow-hidden">
        <img 
          src="https://th.bing.com/th/id/OIP.mLmJD9X4a3Czvrvuea5b6AHaEo?rs=1&pid=ImgDetMain" 
          alt="Bella Vista Restaurant Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Restaurant Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-wine-900 mb-4 leading-tight">
                Make Your Reservation
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-light mb-6">
                Experience exceptional dining in an elegant atmosphere. Our carefully crafted menu features the finest ingredients and innovative culinary techniques.
              </p>
            </div>

            <Card className="border-none shadow-md bg-gray-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-wine-900 text-lg font-semibold">
                  <MapPin className="mr-2 h-4 w-4" />
                  Location & Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-wine-800 mb-2 text-base">Address</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    123 Gourmet Boulevard<br />
                    Downtown District, City 12345<br />
                    Phone: (555) 123-4567
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-wine-800 mb-2 text-base">Business Hours</h4>
                  <div className="space-y-1 text-gray-600 text-sm">
                    <p><span className="font-medium">Monday - Saturday:</span> 12:00 PM - 10:00 PM</p>
                    <p><span className="font-medium">Sunday:</span> Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Reservation Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm">
              <Card className="border-none shadow-lg bg-white">
                <CardHeader className="bg-wine-900 text-white text-center py-5">
                  <CardTitle className="text-xl font-semibold">Reserve Your Table</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Date Picker */}
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-wine-800 font-medium text-xs uppercase tracking-wide">
                        Preferred Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal border-gray-200 hover:border-wine-300 py-4 h-10",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span className="text-sm">Select a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Picker */}
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-wine-800 font-medium text-xs uppercase tracking-wide">
                        Preferred Time
                      </Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="border-gray-200 hover:border-wine-300 h-10">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select a time" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Number of People */}
                    <div className="space-y-2">
                      <Label htmlFor="people" className="text-wine-800 font-medium text-xs uppercase tracking-wide">
                        Party Size
                      </Label>
                      <Select value={people} onValueChange={setPeople}>
                        <SelectTrigger className="border-gray-200 hover:border-wine-300 h-10">
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select party size" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Person' : 'People'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-wine-800 font-medium text-xs uppercase tracking-wide">
                        Special Requests
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Dietary restrictions, special occasions..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[70px] border-gray-200 hover:border-wine-300 focus:border-wine-500 resize-none text-sm"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-wine-900 hover:bg-wine-800 text-white py-4 text-sm font-medium transition-all duration-200 mt-6"
                      disabled={!date || !time || !people}
                    >
                      Confirm Reservation
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4 font-light">
                    You will receive confirmation within 15 minutes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationScreen;
