// Smooth scroll function
function scrollTo(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ 
    behavior: 'smooth' 
  });
}

// Animate stats on load
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + '%';
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + '%';
      }
    }, 30);
  });
}

// AI Study Plan Generator (smart algorithm)
function generatePlan() {
  const subjects = document.getElementById('subjects').value.split(',').map(s => s.trim()).filter(s => s);
  const hours = parseInt(document.getElementById('hours').value) || 15;
  const focus = document.getElementById('focus').value;
  
  if (subjects.length === 0) {
    alert('Add your subjects first! 📚');
    return;
  }
  
  // Calculate sessions per subject
  const totalSessions = Math.floor(hours / 2); // 2hr sessions
  const sessionsPerSubject = Math.floor(totalSessions / subjects.length);
  
  // Generate plan
  let planHTML = '';
  const days = ['Monday', 'Wednesday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'];
  
  subjects.forEach((subject, index) => {
    planHTML += `
      <div class="plan-card" style="animation-delay: ${index * 0.1}s">
        <h4>📚 ${subject}</h4>
        <p><strong>${sessionsPerSubject * 2} hours/week</strong></p>
    `;
    
    // Schedule specific days
    for(let i = 0; i < sessionsPerSubject; i++) {
      const dayIndex = (index * 2 + i) % days.length;
      planHTML += `<div>• ${days[dayIndex]}: 2 hours (7-9 PM)</div>`;
    }
    
    planHTML += `
        <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">
          ${focus === 'advanced' ? '🔥 Advanced: Include projects + coding challenges' : 
            focus === 'intermediate' ? '⚡ Intermediate: Practice + review' : '📖 Beginner: Learn fundamentals'}
        </div>
      </div>
    `;
  });
  
  // Show total summary
  planHTML += `
    <div class="plan-card" style="background: linear-gradient(135deg, #28a745, #20c997); animation-delay: 0.5s">
      <h4>📊 Weekly Summary</h4>
      <p><strong>${subjects.length} subjects • ${hours}h total</strong></p>
      <div>• ${totalSessions} sessions • Perfect balance!</div>
      <div>• Pomodoro ready: 25min focus + 5min break</div>
    </div>
  `;
  
  document.getElementById('study-plan').innerHTML = planHTML;
  document.getElementById('plan-output').style.display = 'block';
  
  // Scroll to plan
  document.getElementById('plan-output').scrollIntoView({ behavior: 'smooth' });
}

// Download PDF (fake - shows shareable text)
function downloadPlan() {
  const subjects = document.getElementById('subjects').value;
  const hours = document.getElementById('hours').value;
  
  const planText = `AI Study Plan by Lord Luwie
Subjects: ${subjects}
Hours/Week: ${hours}h

Generated on ${new Date().toLocaleDateString()}

Share this plan! 👇`;
  
  // Copy to clipboard
  navigator.clipboard.writeText(planText).then(() => {
    alert('Plan copied to clipboard! 📋 Paste anywhere (WhatsApp, Notes, etc.)');
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  animateStats();
  
  // Nav scroll links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href').substring(1);
      scrollTo(sectionId);
    });
  });
  
  // Form enter key
  document.getElementById('subjects').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generatePlan();
  });
});
// Pomodoro Timer
let timeLeft = 25 * 60; // 25 minutes
let isRunning = false;
let timerInterval;
let sessions = 0;
let streak = 0;
let totalTime = 0;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startPomodoro() {
  if (!isRunning) {
    isRunning = true;
    document.querySelector('.btn-start').style.display = 'none';
    document.querySelector('.btn-pause').style.display = 'inline-block';
    
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        sessions++;
        totalTime += 25;
        document.getElementById('sessions').textContent = sessions;
        document.getElementById('totalTime').textContent = totalTime;
        alert('🎉 Session complete! Take 5 min break!');
        resetPomodoro();
      }
    }, 1000);
  }
}

function pausePomodoro() {
  isRunning = false;
  clearInterval(timerInterval);
  document.querySelector('.btn-start').style.display = 'inline-block';
  document.querySelector('.btn-pause').style.display = 'none';
}

function resetPomodoro() {
  pausePomodoro();
  timeLeft = 25 * 60;
  updateTimerDisplay();
}

// Fake music toggle (real audio later)
let musicPlaying = false;
function toggleMusic() {
  musicPlaying = !musicPlaying;
  const btn = document.querySelector('.music-btn');
  btn.textContent = musicPlaying ? '🔇 Stop Music' : '🎵 Focus Music';
  btn.style.background = musicPlaying ? 
    'linear-gradient(45deg, #dc3545, #ff6b81)' : 
    'linear-gradient(45deg, #17a2b8, #20c997)';
}
// Progress Ring Animation
function updateStreakRing(percent) {
  const circumference = 2 * Math.PI * 85;
  const offset = circumference - (percent / 100) * circumference;
  document.getElementById('streak-ring').style.strokeDashoffset = offset;
}
