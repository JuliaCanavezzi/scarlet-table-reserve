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
  const timeSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', {
      date,
      time,
      people,
      notes
    });
    // Here you would typically send the data to your backend
  };
  return <div className="min-h-screen bg-gradient-to-br from-wine-50 to-wine-100">
      {/* Navbar */}
      <nav className="text-white py-6 px-4 shadow-lg bg-wine-950">
        <div className="container mx-auto">
          <h1 className="text-white font-cursive text-3xl md:text-4xl font-medium tracking-wide">
            Bella Vista Restaurant
          </h1>
        </div>
      </nav>

      {/* Restaurant Image */}
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=600&fit=crop" alt="Bella Vista Restaurant Interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-wine-900 bg-opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Restaurant Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-cursive md:text-4xl font-bold text-wine-900 mb-6">
                Make Your Reservation
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Experience exceptional dining in an elegant atmosphere. Our carefully crafted menu 
                features the finest ingredients and innovative culinary techniques.
              </p>
            </div>

            <Card className="border-wine-200 shadow-lg">
              <CardHeader className="bg-wine-50">
                <CardTitle className="flex items-center text-wine-900">
                  <MapPin className="mr-2 h-5 w-5" />
                  Location & Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-wine-800 mb-2">Address</h4>
                  <p className="text-gray-600">
                    123 Gourmet Boulevard<br />
                    Downtown District, City 12345<br />
                    Phone: (555) 123-4567
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-wine-800 mb-2">Opening Hours</h4>
                  <div className="space-y-1 text-gray-600">
                    <p><span className="font-medium">Monday - Thursday:</span> 12:00 PM - 10:00 PM</p>
                    <p><span className="font-medium">Friday - Saturday:</span> 12:00 PM - 11:00 PM</p>
                    <p><span className="font-medium">Sunday:</span> 1:00 PM - 9:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Reservation Form */}
          <div>
            <Card className="border-wine-200 shadow-xl">
              <CardHeader className="bg-wine-900 text-white">
                <CardTitle className="text-2xl text-center">Book Your Table</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-wine-800 font-medium">Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal border-wine-200 hover:border-wine-400", !date && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={date} onSelect={setDate} disabled={date => date < new Date()} initialFocus className="pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Picker */}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-wine-800 font-medium">Preferred Time</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="border-wine-200 hover:border-wine-400">
                        <Clock className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(slot => <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of People */}
                  <div className="space-y-2">
                    <Label htmlFor="people" className="text-wine-800 font-medium">Number of People</Label>
                    <Select value={people} onValueChange={setPeople}>
                      <SelectTrigger className="border-wine-200 hover:border-wine-400">
                        <Users className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select party size" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Person' : 'People'}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-wine-800 font-medium">Special Requests (Optional)</Label>
                    <Textarea id="notes" placeholder="Any dietary restrictions, special occasions, or other requests..." value={notes} onChange={e => setNotes(e.target.value)} className="min-h-[100px] border-wine-200 hover:border-wine-400 focus:border-wine-500" />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full bg-wine-900 hover:bg-wine-800 text-white py-3 text-lg font-medium transition-colors duration-200" disabled={!date || !time || !people}>
                    Reserve Table
                  </Button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-4">
                  You will receive a confirmation email within 15 minutes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default ReservationScreen;
