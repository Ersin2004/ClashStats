import React, { useState } from 'react';

const Achievements = ({ playerData }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  // more achievements
  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, playerData.achievements.length));
  };

  // less achievements
  const handleShowLess = () => {
    setVisibleCount(5);
  };

  return (
    <div>
      <ul className="space-y-4 text-black">
        {playerData.achievements.slice(0, visibleCount).map((achievement) => (
          <li key={achievement.id} className="flex flex-col space-y-2 p-4 border rounded-lg bg-white shadow-md">
            {/* Achievement Name and Progress */}
            <div className="flex justify-between">
            <span className="font-semibold">{achievement.name}:</span>
            <span>
                {Math.min(achievement.value, achievement.target)} / {achievement.target}
            </span>
            </div>
            {/* Stars */}
            <div className="flex items-center justify-between">
              <span className="font-semibold">Stars:</span>
              <div className="flex space-x-1">
                {/* Render stars */}
                {Array.from({ length: 3 }, (_, index) => (
                  achievement.stars > index ? (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="yellow"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-yellow"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-yellow"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  )
                ))}
              </div>
            </div>

            {/* Village Info */}
            <div className="flex justify-between">
              <span className="font-semibold">Village:</span>
              <span>{achievement.village}</span>
            </div>

            {/* Achievement Info */}
            <div className="flex justify-between">
              <span className="font-semibold">Info:</span>
              <span>{achievement.info}</span>
            </div>

            {/* Completion Info */}
            {achievement.completionInfo && (
              <div className="flex justify-between">
                <span className="font-semibold">Completion:</span>
                <span>{achievement.completionInfo}</span>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Show More / Show Less */}
      <div className="flex justify-center mt-4">
        {visibleCount < playerData.achievements.length && (
          <button
            onClick={handleShowMore}
            className="bg-blue py-2 px-4 rounded-lg shadow hover:bg-dark-blue mr-2 text-white"
          >
            Show More
          </button>
        )}

        {visibleCount > 5 && (
          <button
            onClick={handleShowLess}
            className="bg-blue py-2 px-4 rounded-lg shadow hover:bg-dark-blue text-white"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Achievements;
