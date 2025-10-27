// 日曆組件
function CalendarModal({
  title,
  selectedDate,
  onSelectDate,
  onClose,
  minDate,
  excludeDate,
}: {
  title: string;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
  minDate?: Date;
  excludeDate?: Date | null;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 10)); // Nov 2026
  const nextMonth = new Date(2026, 11); // Dec 2026

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar = [];
    let week = Array(firstDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      calendar.push(week);
    }
    return calendar;
  };

  const isSelected = (day: number | null, month: Date) => {
    if (!day || !selectedDate) return false;
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    return date.toDateString() === selectedDate.toDateString();
  };

  const isHighlighted = (day: number | null, month: Date) => {
    if (!day) return false;
    // 高亮 13, 19 (Nov) 和 20 (Dec)
    if (month.getMonth() === 10 && (day === 13 || day === 19)) return true;
    if (month.getMonth() === 11 && day === 20) return true;
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#3a4d5c] rounded-2xl p-8 max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[currentMonth, nextMonth].map((month, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="text-[#D4A574] text-sm mb-1">
                  {month.getFullYear()}
                </div>
                <div className="text-gray-800 font-semibold text-lg">
                  {months[month.getMonth()]}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs text-gray-500 font-medium py-2"
                  >
                    {day}
                  </div>
                ))}
                {generateCalendar(month).map((week, wIdx) => (
                  <React.Fragment key={wIdx}>
                    {week.map((day, dIdx) => (
                      <button
                        key={dIdx}
                        onClick={() => {
                          if (day) {
                            onSelectDate(
                              new Date(
                                month.getFullYear(),
                                month.getMonth(),
                                day
                              )
                            );
                          }
                        }}
                        className={`
                          aspect-square rounded-full flex items-center justify-center text-sm font-medium
                          ${
                            !day
                              ? ''
                              : isHighlighted(day, month)
                                ? 'bg-[#D4A574] text-white font-bold'
                                : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                          }
                        `}
                      >
                        {day}
                      </button>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
