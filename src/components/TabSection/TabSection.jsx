import Button from '../Button/Button';
import './TabSection.css';
// import { useState } from 'react';

export default function TabSection({ activeTab, onTabChange }) {
  //   const [activeTab, setActiveTab] = useState('tab1');

  return (
    <section className="tab-section" style={{ marginBottom: '1rem' }}>
      <Button
        isActive={activeTab === 'main'}
        onClick={() => onTabChange('main')}
      >
        Головна
      </Button>
      <Button
        isActive={activeTab === 'feedback'}
        onClick={() => onTabChange('feedback')}
      >
        Зворотній зв'язок
      </Button>
      <Button
        isActive={activeTab === 'effect'}
        onClick={() => onTabChange('effect')}
      >
        Ефекти
      </Button>
      {/* <div className="tab-buttons">
        <button
          className={activeTab === 'tab1' ? 'active' : ''}
          onClick={() => setActiveTab('tab1')}
        >
          Tab 1
        </button>
        <button
          className={activeTab === 'tab2' ? 'active' : ''}
          onClick={() => setActiveTab('tab2')}
        >
          Tab 2
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'tab1' && <p>Content for Tab 1</p>}
        {activeTab === 'tab2' && <p>Content for Tab 2</p>}
      </div> */}
    </section>
  );
}
