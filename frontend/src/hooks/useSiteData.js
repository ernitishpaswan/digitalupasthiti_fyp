// Website ka data fetch karne ka custom hook
// Ye dono - latest release aur site content - ek saath laata hai
import { useState, useEffect } from 'react';
import { getLatestRelease, getSiteContent } from '../api';

const useSiteData = () => {
  const [release, setRelease] = useState(null);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Dono calls parallel mein karo - faster hoga
        const [releaseRes, contentRes] = await Promise.allSettled([
          getLatestRelease(),
          getSiteContent(),
        ]);

        if (releaseRes.status === 'fulfilled') {
          setRelease(releaseRes.value.data);
        }
        if (contentRes.status === 'fulfilled') {
          setContent(contentRes.value.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { release, content, loading, error };
};

export default useSiteData;
