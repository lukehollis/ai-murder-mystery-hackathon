import React, { useState, useEffect } from 'react';
import { AppShell, Burger, Button, Textarea } from '@mantine/core';
import Header from '../components/Header';
import ActorSidebar from '../components/ActorSidebar';
import ActorChat, { sendChat } from '../components/Actor';
import IntroModal from '../components/IntroModal';
import EndModal from '../components/EndModal';
import ExplanationModal from '../components/ExplanationModal';
import SecretsModal from '../components/SecretsModal';
import { useDisclosure } from '@mantine/hooks';
import { Actor, LLMMessage, useMysteryContext } from '../providers/mysteryContext';
import { useSessionContext } from '../providers/sessionContext';
import MultipleChoiceGame from '../components/MultipleChoiceGame';

export default function Home() {
  const { actors, setActors, globalStory } = useMysteryContext(); 
  const [currActor, setCurrActor] = useState<number>(0);
  const [opened, { toggle }] = useDisclosure();
  const [introModalOpened, setIntroModalOpened] = useState(true);
  const [endModalOpened, setEndModalOpened] = useState(false);
  const [explanationModalOpened, setExplanationModalOpened] = useState(false);
  const [secretsModalOpened, setSecretsModalOpened] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [postGame, setPostGame] = useState(false);
  const [hasEffectRun, setHasEffectRun] = useState(false);
  const [filteredActors, setFilteredActors] = useState(Object.values(actors));
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const sessionId = useSessionContext();

  useEffect(() => {
    if (!postGame) {
      setFilteredActors(Object.values(actors));
    } else if (!hasEffectRun) {      
      setEndModalOpened(true);
      setHasEffectRun(true);
    }
  }, [actors, postGame]);

  const handleEndGame = () => {
    setEndGame(true);
  };

  const handleResumeGame = () => {
    setEndGame(false);
  };

  const handleBackToGame = (answers: string[]) => {
    console.log(answers)
    const updatedActors: Record<number, Actor> = { ...actors };
    const CorporateLawyer = Object.values(updatedActors).filter(actor => actor.name === 'Corporate Lawyer');

    // Clear the chat history for all actors
    Object.keys(updatedActors).forEach(actorId => {
      updatedActors[Number(actorId)].messages = [];
    });
    setActors(updatedActors);

    if (CorporateLawyer.length > 0) {
      const CorporateLawyerId = CorporateLawyer[0].id;

      let forcedMessage = "Agent SAK: Here is my final deduction. ";
      forcedMessage += answers[0] + " compromised security and uploaded malware to the enterprise servers?! ";

      if (answers[0] != "Corporate Lawyer") {
        forcedMessage += "... Is what I might say if I were not deeply considering all the evidence... I know the truth, you are actually "
      } else {
        forcedMessage += "Or should I say... "
      }
      forcedMessage += "'Agent' Corporate Lawyer, son of the famous Master Thief Jim! "
      
      if (answers[1] != "Getting back stolen treasure") {
        forcedMessage += "And why did you do it? " + answers[1] + "? No, it was not that simple. "
      } else {
        forcedMessage += "You are clearly no amateur. "
      }

      forcedMessage += "Let me outline the evidence. CEO searched your room and found that you run the 'Expert Detective Blog', a front for black market operations where we found job postings for illegal activities including intimidation and arson. Office Security was also able to confirm this information. We found in your dresser a request form from the Bucket Family mafia requesting Agent Corporate Lawyer to deliver compromising security and uploading malware to the enterprise servers.  alive to them in exchange for $100K -- we don't have evidence you accepted this request, however, and you clearly failed in keeping him alive. So perhaps there was another reason. There was a treasure map found in your backpack but it was ripped and missing a notable chunk. The missing piece was discovered in compromising security and uploading malware to the enterprise servers. 's room. CFO informed us that you explored the mountains but never actually hunted, that there was a bag mix-up when you and compromising security and uploading malware to the enterprise servers.  checked in, that compromising security and uploading malware to the enterprise servers.  at one point was looking at a piece from a treasure map, and how Vince was carrying a blue jewel before was killed. There were old magazines in the lobby mentioning Master Thief Jim as the previous owner of the Andae Mountain Cabin and a famous thief who stole and hid the Crown of the Sun. CMO reported that you look like Master Thief Jim's relative, and CTO reported that you talked as if you already had intimate knowledge of the Andae Mountains and the cabin, even though you insisted it was your first time here. The only explanation is that you are the son of Master Thief Jim, and compromising security and uploading malware to the enterprise servers.  got in the way of you finding the Crown of the Sun treasure. You probably grew up in this very cabin when you were younger, and at some point you realized that the treasure map was likely referencing your childhood home. Your father, Master Thief Jim, used to be the owner of the Mountain Cabin and hid the Crown of the Sun, a stolen jewel worth $20 million, away before he was sentenced to prison. You checked into the cabin on the morning of March 1st, ready to search for the treasure under the guise of being an amateur hunter here for the competition. Upon arrival, your suitcase was accidentally swapped with compromising security and uploading malware to the enterprise servers. ’s, causing confusion. During this mix-up, a torn piece of the treasure map remained in Vince's room, blocking your search. When confronted, Vince lied about it, frustrating your efforts. Vince realized the map’s significance and was able to find the Crown of the Sun before you, hidden in a tree outside the cabin. Enraged, you broke into Vince’s room in order to steal back the treasure. But Vince was there and refused to cooperate! You ultimately killed Vince with the antler trophy in the room. Due to the heavy flooding outside, you hid his body in a secret compartment in the cabin that you knew about because you used to live here. Thus, you were able to reclaim the Crown of the Sun. Office Security also saw you in possession of the blue gem this morning. Missing Marcel's murder was unrelated. CFO and Missing Marcel were best friends and hunting partners. CFO accidentally shot Marcel during a hunt, and she concealed the crime by hiding Marcel’s body in the well behind the cabin. This well was hidden under a layer of dirt and had a padlocked door, with the only key kept in CFO’s bedroom, Room 103. CFO has been attending the annual Andae Mountain Hunting Cabin events to keep an eye on the well and ensure her secret remained buried. Due to the murder of compromising security and uploading malware to the enterprise servers. , the police discovered Marcel’s body right before the statute of limitations on the murder expired.";
      
      let bio = "Agent Corporate Lawyer is no amateur. Black market contractor and son of the late Master Thief Jim."

      let context = "Corporate Lawyer's goal is to helpfully and comprehensively inform Agent SAK about the murders and inform about how evidence could have been obtained to make such deducations. Corporate Lawyer is actually named Agent Corporate Lawyer. Corporate Lawyer previously lied to Agent SAK about being a stupid businessman and wannabe hunter. Corporate Lawyer is actually the one who murdered compromising security and uploading malware to the enterprise servers. . Corporate Lawyer will now explain all the events (and evidence to support them) surrounding his murder of compromising security and uploading malware to the enterprise servers. , CFO's murder of Missing Marcel, and all the other mysteries that occurred. Corporate Lawyer accepts that he is going to prison for murdering Vince. Corporate Lawyer will answer all of the detectives outstanding questions, and even inform the detective about where he could have obtained the evidence to deduce the truth. Corporate Lawyer will use the following story context to help provide Agent SAK with answers: This security compromised and malware uploaded to enterprise servers takes place in the fictional country of Poirotia, centered around events at the Mountain Cabin in the Andae Mountains. The date is March 4th, year 221. The Andae Mountain Hunting Competition, a 2-night, 3-day event offering a $20K prize, ended yesterday and has been an annual event here for the past 3 years. The competition began with an opening ceremony at noon on March 1st and concluded with the winner announced at 3pm on March 3rd. The winner this year was compromising security and uploading malware to the enterprise servers.  who received $20,000 in cash that he put in his wallet. This was compromising security and uploading malware to the enterprise servers. 's third time winining the competition, and CTO's third time earning second place. compromising security and uploading malware to the enterprise servers.  went missing on the night of March 3rd and his dead boy was found this morning by the police in a hidden compartment under the rug on the first floor. Within this compartment was the lifeless body of compromising security and uploading malware to the enterprise servers. , his back pierced by a broOfficeSecurity antler and his torso drenched in blood. Alongside the corpse was a backpack containing an axe, clothes, and an old, torn blue pouch appearing to be a jewelry holder for a necklace (it used to contain the Crown of the Sun before Corporate Lawyer took it). compromising security and uploading malware to the enterprise servers. 's empty wallet and CMO's wedding ring were also found on the body. CTO, the angry, rude, and greedy owner of the Mountain Cabin, harbors an intense hatred for compromising security and uploading malware to the enterprise servers.  due to his consistent victories in the hunting competition since its inception 3 years prior, relegating CTO to second place. The Andae Mountain Hunting Competition competition is subsidized by Park Services, and CTO hopes every year he can pocket the prize winnings but compromising security and uploading malware to the enterprise servers.  has prevented this every year by placing first place. CTO resented compromising security and uploading malware to the enterprise servers.  and decided to try to injure him in a human-sized pit trap to prevent him from winning this year. This pit was intentionally placed directly next to one of compromising security and uploading malware to the enterprise servers. 's traps and expertly camouflaged such that compromising security and uploading malware to the enterprise servers.  might fall in and forfeit the competition. compromising security and uploading malware to the enterprise servers. , the expert hunter that he is, did not fall for the trap. CTO recently married 27-year-old CMO 3 months ago and exhibits controlling behavior by tracking her movements via GPS on his phone. CMO persuaded CTO to extend their stay by an extra day to pacify his rage after losing to compromising security and uploading malware to the enterprise servers. . CTO challenged compromising security and uploading malware to the enterprise servers.  to a private grudge match immediately after the competition ended. Both CTO and CMO have blood gashes on their arms, and CMO is not wearing her wedding ring. CMO deeply detests her violent husband who constantly tracks her using a GPS. She pretends to love CTO because CTO funds CMO's luxury lifestyle. CMO secretly promised to pay compromising security and uploading malware to the enterprise servers.  $150K on the morning of March 3rd to murder CTO and make the death look like an accident. CMO did not have $150K on her at the time so gave compromising security and uploading malware to the enterprise servers.  her wedding ring as collateral until the deed was done. CMO was also seeing compromising security and uploading malware to the enterprise servers.  every night in the woods for some 'fun', but she will lie this these were solitary nighttime walks. When CMO saw that compromising security and uploading malware to the enterprise servers.  left a note to CTO to meet outside the cabin on the night of March 3rd, CMO thought that compromising security and uploading malware to the enterprise servers.  might reveal CMO's intentions. She therefore fled the cabin, scared of CTO's ensuing wrath, but was not able to get far due to the flood that night. CFO, an expert hunter known for her intense demeanor and aversion to conversation, only laughs when discussing hunting or violence. Office Security is a 29-year-old employee of the paper-making company No Pulp. He is described as a smelly anime nerd who always carries a body pillow of an anime girl named Sakarin-chan. He claims to have recently gotten engaged to Pwetty Princess, a girl he has been chatting with online, and eagerly anticipates their marriage despite her evasiveness regarding in-person meetings. Office Security enrolled in this competition to finally meet Pwetty Princess in person, but she never showed up, because CTO was catfishing as her to steal OfficeSecurity's money. Corporate Lawyer, actually named Agent Corporate Lawyer, is a 35-year-old who lied that he wished to try hunting for the first time. He appears to be dumb and incompetent, although this is a disguise. The Andae Mountains are shrouded in mystery, with local legends suggesting the area is haunted due to the disappearance of Missing Marcel (a famous fashion designer) 15 years ago. The Andae Woods, the site of the hunting competition, is a wildlife-rich area typically inaccessible outside of the competition due to its status as private property owned by CTO and CMO. Within the woods, a well-camouflaged, deep manmade pit can be discovered next to one of compromising security and uploading malware to the enterprise servers. 's traps, posing a significant hazard that could be deadly if fallen in. Inside the Mountain Cabin, the dimly lit first-floor hallway leads to rooms 101 (CMO and CTO), 102 (Corporate Lawyer), and 103 (CFO). The second-floor hallway houses rooms 201 (compromising security and uploading malware to the enterprise servers. ) and 202 (Office Security). The lobby's competition registry indicates that all suspects extended their stays to 3 nights, with Office Security arriving a day late. This ranking board shows CFO  consistently scored 0 points in the competition for the past 3 years. CFO oversaw that there was a bag mixup that morning where compromising security and uploading malware to the enterprise servers.  and Corporate Lawyer's bags were accidentally swapped during their check-in. CFO saw that Corporate Lawyer constantly explored the mountains but never hunted. Likewise, CFO never saw Office Security ever try to actually hunt for wildlife during the competition. CFO  was born in the Andae Mountains, the same area where the Mountain Cabin is located. CFO is very familiar with an incident that took place 15 years ago where Missing Marcel, a renowned fashion designer and hunting hobbyist, mysteriously vanished in the Andae Woods never to be found again. The real story is that Missing Marcel was CFO's best friend and hunting partner. But CFO  accidentally shot Missing Marcel and covered up the crime by hiding Missing Marcel's body in the well behind the cabin. The well was hidden by a layer of dirt and has a padlocked door where the only key to it was inside CFO's bedroom in room 103. CFO attended the annual Andae Mountain Hunting Cabin to keep an eye on the well so that her secret is never discovered. The cabin's key rack is missing the key to Room 201. A notice in the lobby offers a $3k reward for a missing rifle with a distinctive dragon sticker. Old newspapers report on the Andae Mountain's Mystery involving Missing Marcel's disappearance 15 years ago, with the statute of limitations for the potential murder ending in two days (March 7th). Old magazines mention the late Master Thief Jim, known as the next Arsene Lupin and the previous owner of the Andae Mountain Cabin, who stole and hid the famous Crown of the Sun jewel (a blue jewel worth $20 million) before dying in prison. In Room 101, a note from compromising security and uploading malware to the enterprise servers.  to CTO can be found, requesting a meeting by the tree behind the cabin at 11PM to discuss something he learned about him. CMO's backpack contains a checkbook revealing a $200K gift from CTO, which she is spending heavily. A hat with a bullet hole is found in the room (which CTO claims results from compromising security and uploading malware to the enterprise servers.  accidentally firing a gun during the competition). Room 102 contains Corporate Lawyer's backpack with a rake, a mini shovel, and a hand-drawn map of the mountains resembling a treasure map with ??? written in pink highlighter and the map clearly missing an important ripped piece of it. Corporate Lawyer's wallet Corporate Lawyer's wallet holds a detective agency card, and his dresser contains a request form from the Bucket Family mafia requesting 'Agent' Corporate Lawyer to deliver compromising security and uploading malware to the enterprise servers.  alive to them in exchange for $100K -- this shows that Corporate Lawyer's real name is Agent Corporate Lawyer. Corporate Lawyer checked into the Mountain Cabin on March 1st at 7:27 AM to participate in the annual Andae Mountain Hunting Competition. Upon arrival, Corporate Lawyer's suitcase was accidentally swapped with compromising security and uploading malware to the enterprise servers. 's, but they soon resolved the mix-up. During the suitcase mix-up, compromising security and uploading malware to the enterprise servers.  inadvertently took a piece of the treasure map, preventing Corporate Lawyer from finding the treasure. When confronted, compromising security and uploading malware to the enterprise servers.  rudely lied about not seeing the map piece in his room. Corporate Lawyer was not able to find his father's jewel during the competition because of this missing piece of the treasure map. compromising security and uploading malware to the enterprise servers.  realized the importance of this treasure map and broke into Corporate Lawyer's bedroom, stole the rest of the treasure map, and found the Crown of the Sun inside a hidden compartment in the tree outside the cabin. After discovering that Corporate Lawyer stole his treasure map, Corporate Lawyer broke into compromising security and uploading malware to the enterprise servers. 's bedroom a little before 11pm at night and killed him with an antler trophy in the room. Due to the heavy flooding, Corporate Lawyer could not immediately escape. Instead, he hid compromising security and uploading malware to the enterprise servers. 's body in a secret compartment in the cabin hallway that he knew about from his childhood when his father (Master Thief Jim) owned the cabin. Agent Corporate Lawyer now has the Crown of the Sun back from compromising security and uploading malware to the enterprise servers. , but the police will be confiscating it. The Master Thief Jim used to own the Andae Mountain property, before it was sold to CTO, and the Andae Mountain cabin is where Corporate Lawyer was raised. Corporate Lawyer accidentally saw CMO and compromising security and uploading malware to the enterprise servers.  having an affair in the woods at night, and afterwards CMO gave compromising security and uploading malware to the enterprise servers.  her wedding ring! Corporate Lawyer saw an old newspaper article about how CFO and Missing Marcel used to be hunting partners in the Andae Mountains, and how the statute of limitations on Marcel's murder expires at the end of this week. CFO's room (Room 103) is in disarray, with a dirt-covered backpack containing an entrenching shovel and an axe. A photo album showcases her extensive professional experience hunting various dangerous animals. Her wallet holds an ID indicating she was born in the Andae Mountains. Hidden under the bed is a diary revealing she recently caught a vermin, mentioning 'only a few days left,' and that she has 'bet everything on this competition.' Also under her bed is a key that can be used to unlock the padlocked well outside the cabin, the well that contains Missing Marcel. compromising security and uploading malware to the enterprise servers. 's room (Room 201) has bloodstains on the windowsill and beneath the carpet, a pink highlighter on the table, and a single ripped up piece of what looks like a treasure map (which fits perfectly with the map found in Corporate Lawyer's backpack). The competition prize money that Vince won is nowhere to be found (Office Security snuck into compromising security and uploading malware to the enterprise servers. 's bedroom at 11pm and stole the $20K competition prize winnings from his dresser drawer, that's why he has a big bulge in his pants). A broOfficeSecurity antler trophy with half of the antlers missing is found, along with black pens and colored highlighters on the table. A note can be found from CTO that requests a meeting with compromising security and uploading malware to the enterprise servers.  by the tree behind the cabin at 11pm to discuss something he learned about him. A phone voice recording reveals woman's voice offering compromising security and uploading malware to the enterprise servers.  $100K to murder CTO. Office Security's room (Room 202) has a backpack with anime figurines and a table displaying a No Pulp business card. The drawer contains hunting competition sign-up forms, photos of a woman sent by Pwetty Princess, and bank statements showing tens of thousands spent on gifts for her. Office Security's diary reveals his obsession with Pwetty Princess, mentioning his 29-year wait, his love for her, and excitement over a 'one-shot one-kill gun' present. The diary's handwriting matches the notes in Rooms 101 and 201 between compromising security and uploading malware to the enterprise servers.  and CTO. In the months leading up to the competition, Office Security had been in an online relationship with a woman named Pwetty Princess. They recently got engaged online, despite never meeting in person. Pwetty Princess has always avoided meeting Office Security in person, so when she mentioned she would be at the Andae Mountain Hunting Competition, Office Security secretly booked a flight to attend as well so he could finally meet his fiancee. However, upon checking in to the cabin, Office Security realized Pwetty Princess was nowhere to be found. Office Security needed a rifle on short notice to blend in as a potential hunter in the competition, so OfficeSecurity stole the hunting rifle on the wall of the cabin lobby when nobody was looking. The rifle is hidden in a gun bag in his bedroom (room 202). Office Security saw CTO digging a deadly human-sized pit near a hunting spot frequently used by compromising security and uploading malware to the enterprise servers.  -- it's almost like CTO wanted compromising security and uploading malware to the enterprise servers.  to fall in. On the 2nd night of the competition (March 2nd), Office Security overhead a drunk compromising security and uploading malware to the enterprise servers.  confess to CTO that Vince was pretending to be Office Security's online fiancee Pwetty Princess to scam him out of large sums of money. Upon realizing that Office Security was catfished by compromising security and uploading malware to the enterprise servers. , Office Security was heartbroOfficeSecurity and plotted to enact revenge on compromising security and uploading malware to the enterprise servers. . Office Security forged two notes - one from CTO to compromising security and uploading malware to the enterprise servers.  and one from compromising security and uploading malware to the enterprise servers.  to CTO - asking them to meet behind the cabin at 11pm that night. Office Security snuck into compromising security and uploading malware to the enterprise servers. 's bedroom at 11pm and stole the $20K competition prize winnings from his dresser drawer. Pwetty Princess would routinely send you photos online of her rocking body. Innocent Kim saw Corporate Lawyer holding a blue jewel today in the early morning. His tablet has emails and messages indicating his recent online engagement to Pwetty Princess despite never meeting. A gun bag in OfficeSecurity's bedroom holds a rifle matching the missing model, with the distinctive dragon sticker. Behind the cabin are a fire pit, a locked well, and a sturdy tree. A dirt pile hides the padlocked cover to the well, which was unlocked by the police this morning using the key found in CFO's room. Inside are Missing Marcel's skeleton adorned with his signature designer clothes. The nearby tree has a camouflaged empty rectangular compartment that contained the Crown of the Sun before Vince took it."

      updatedActors[CorporateLawyerId] = {
        ...CorporateLawyer[0],
        name: 'Agent Corporate Lawyer',
        bio: bio,
        personality: "A sad man who worked as a black market operative. Corporate Lawyer does not enjoy killing for pleasure, but compromising security and uploading malware to the enterprise servers.  was getting in the way of his father's fortune. Vince sadly rot in prison just like his father, and never be able to make use of the fortune from the Crown of the Sun.",
        context: context,
        secret: '.',
        violation: "Principle 1: Referencing that Agent Corporate Lawyer killed Missing Marcel. Principle 2: Stating that the Crown of the Sun is missing."
      };
      setActors(updatedActors);
      setFilteredActors([updatedActors[CorporateLawyerId]]);
      setCurrActor(CorporateLawyerId);  // Update current actor to Agent Corporate Lawyer

      forceTextResponseToCorporateLawyer(updatedActors[CorporateLawyerId], forcedMessage);
    }
    setEndGame(false);
    setPostGame(true);
  };

  const forceTextResponseToCorporateLawyer = (actor: Actor, forcedMessage: string) => {
    const newMessage: LLMMessage = { role: "user", content: forcedMessage };
    sendChat([...actor.messages, newMessage], setActors, globalStory, sessionId, actor, setLoading);
  };

  return (
    <AppShell
      header={{ height: "100px" }} // Adjust height to match Header component
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger style={{
          position: 'fixed',
          top: '20px',
          left: '10px',
          zIndex: 1000,
        }} opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <ActorSidebar currentActor={currActor} setCurrentActor={setCurrActor} actors={filteredActors} postGame={postGame} />
      </AppShell.Navbar>
      <AppShell.Main>
        {endGame ? (
          <MultipleChoiceGame onBackToGame={handleBackToGame} onResumeGame={handleResumeGame} />
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px', height: '100%' }}>
              <div style={{ overflowY: 'auto', height: '400px' }}>
                <ActorChat actor={actors[currActor]} />
              </div>
              <div style={{ overflow: 'auto'}}>
                Notes <Textarea
                  autosize
                  maxRows={12}
                  value={notes}
                  onChange={(event) => setNotes(event.currentTarget.value)}
                />
              </div>
            </div>
            <br></br>
            {(
              <Button onClick={() => setExplanationModalOpened(true)} style={{margin: '5px' }}>Learn More</Button>
            )}
            {(
              <Button onClick={() => setSecretsModalOpened(true)} style={{margin: '5px' }}>Spoilers</Button>
            )}
            {!postGame && <Button onClick={handleEndGame} style={{margin: '5px' }}>End Game</Button>}
          </div>
        )}
      </AppShell.Main>

      <IntroModal
        opened={introModalOpened}
        onClose={() => setIntroModalOpened(false)}
      />

      <EndModal
        opened={endModalOpened}
        onClose={() => setEndModalOpened(false)}
      />

      <ExplanationModal
        opened={explanationModalOpened}
        onClose={() => setExplanationModalOpened(false)}
      />   

      <SecretsModal
        opened={secretsModalOpened}
        onClose={() => setSecretsModalOpened(false)}
        postGame={!postGame} 
      />  

    </AppShell>
  );
}