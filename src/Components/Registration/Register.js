import { Button, Checkbox, Col, Form, Input, Radio, Row, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

import {
  AnswerCol,
  AnswerSubCol,
  Column,
  Container,
  DocsTab,
  FormContainer,
  FormHeader,
  FormItem,
  InputForm,
  QuestionCol,
  QuestionRow,
  QuestionSubCol,
  QuestionSubRow,
  SubmitButton,
  SubmitButtonDiv,
  TextAreaForm,
} from "./style";
import Header from "../Header/Header";

function Register() {
  return (
    <div>
      <Header></Header>

      <Container>
        <FormHeader>1.Family Head/ कुटुंब प्रमुख</FormHeader>
        <FormContainer layout="vertical">
          <Row>
            <Column>
              <FormItem label=" First Name / पहिले नाव">
                <Input type="text"></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Middle Name /मधले नाव">
                <Input type="text"></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Last Name/आडनाव">
                <Input type="text"></Input>
              </FormItem>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormItem label="Address / पत्ता">
                <TextArea></TextArea>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Pin Code / पिन कोड">
                <Input type="number"></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Aadhar Card Number/ आधार क्रमांक">
                <Input type="number"></Input>
              </FormItem>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormItem label="Number of family members above age of 50 years / 50 पेक्षा जास्त वयाच्या कुटुंबातील सदस्यांची संख्या">
                <Input type="number"></Input>
              </FormItem>
            </Column>
          </Row>
        </FormContainer>
      </Container>

      <DocsTab centered defaultActiveKey="tab1">
        <Tabs.TabPane tab="1) Part A /भाग अ" key="tab1">
          <FormHeader> A. Risk assessment/जोखमीचे मुल्यांकन</FormHeader>

          <QuestionRow>
            <QuestionCol>
              १. आपले वय काय आहे ? (पूर्ण वर्षात) / what is your age (in full
              year)
            </QuestionCol>
            <AnswerCol>
              <Input
                style={{ width: "300px" }}
                type="text"
                placeholder="0"
              ></Input>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. तुम्ही धूम्रपान किंवा धूर रहित उत्पादने जसे गुटखा व खैनीसारख्या
              वापर करता ? / Do you smoke or smokeless products like gutkha and
              Use like Khaini?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३. तुम्ही दररोज मद्यपान करता ? / Do you drink every day?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ४. कंबरेचा घेर (सेमी मध्ये) / Waist circumference (in cm)
            </QuestionCol>
            <AnswerCol>
              <Input
                style={{ width: "300px" }}
                type="text"
                placeholder="0"
              ></Input>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ५. तुम्ही एका आठवडयामध्ये कमीत कमी १५० मिनिटे कोणत्याही प्रकारचे
              शारीरिक हालचाल करता का ? (दररोज कमीत कमी ३०मिनिटे – आठवडयातून ५
              दिवस) / Do you do any type of physical activity for at least 150
              minutes a week? (Minimum 30 minutes per day – 5 days per week)
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ६. आपल्याकडे कौटुंबिक इतिहास आहे का ? (आपले पालक किंवा भावंडां
              पैकी) उच्च रक्तदाब, मधुमेह आणि हृदयरोग आहे का ? / 6. Do you have a
              family history? Have high blood pressure, diabetes and heart
              disease (from your parents or siblings)?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <SubmitButtonDiv>
            <SubmitButton>Submit & Continue</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
        <Tabs.TabPane tab="2) Part B/भाग ब" key="tab2">
          <FormHeader>
            B: Early Screening: Ask the patient if they have any of these
            symptoms / लवकर तपासणी : रुग्णाला यापैकी काही लक्षणे आहेत का ते
            विचारा
          </FormHeader>
          <FormHeader>B1 : Female and male / बी १ : महिला आणि पुरुष</FormHeader>
          <QuestionRow>
            <QuestionCol>
              १. धाप लागणे (श्वास घेण्यास त्रास होणे) / Shortness of breath
              (difficulty breathing)
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. २ आठवडयांपेक्षा जास्त खोकला / Cough for more than 2 weeks
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>३. थुंकीत रक्त येणे/ Blood in sputum</QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ४. २ आठवडयांपेक्षा जास्त ताप/ Fever for more than 2 weeks
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>५. वजन कमी होणे/ Weight loss</QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ६. रात्री खूप घाम येणे/ Excessive night sweats
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ७. आपण सध्या टीबीच्या उपचारासाठी औषधे घेत आहात ? / Are you
              currently taking medicines to treat TB?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ८. सध्या कुटुंबातील कोणत्याही सदस्याला टीबीचा आजार आहे का ? / Is
              any family member currently suffering from TB disease?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ९. टीबीचा आजार असण्याचा इतिहास / History of TB disease
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १०. हात आणि पायाच्या तळव्यांना वारंवार जखमा होणे / 10. Frequent
              bruising of hands and soles of feet
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ११. हात आणि पायावर तळव्यांना वारंवार मुंग्या येणे / Frequent
              tingling in palms of hands and feet
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १२. धुसर आणि अंधूक दृष्टी / Blurred and blurred vision
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १३. वाचण्यास त्रास होणे / Difficulty in reading
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १४. एक आठवडयापेक्षा जास्त डोळयामधील वेदना बरी न होणे / Non-relief
              of eye pain for more than a week
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १५. एक आठवडयापेक्षा जास्त डोळे लालसरपणा असणे / Eye redness for
              more than a week
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १६. आपल्याला ऐकण्यास त्रास होणे / You have trouble hearing
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>१७. फीटक्याचा इतिहास / History of Featka</QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १८. तोंड उघडण्यास त्रास होणे / Difficulty opening the mouth
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १९. दोन आठवडयांपेक्षा जास्त तोंडातील जखम बरी न होणे / Non-healing
              of mouth sores for more than two weeks
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २०. दोन आठवडयांपेक्षा जास्त तोंडात असलेली वाढ बरी न होणे /
              Non-healing growth in mouth for more than two weeks
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २१. दोन आठवडयांपेक्षा जास्त तोंडामध्ये पांढरे किंवा लाल घट्टे बरे
              न होणे / Non-healing white or red sores in the mouth for more than
              two weeks
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २२. चघळताना वेदना होणे / Pain while chewing
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>२३. आवाजात बदल होणे/ Changes in voice</QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २४. तोंडामध्ये हलक्या रंगाचे चट्टे किंवा वर्ण होणे ज्यास संवेदना
              नसणे/ Light colored patches or spots in the mouth with no
              sensation
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २५. शरीराच्या कोणत्याही भागात त्वचा जाड होणे/ Thickening of the
              skin in any part of the body
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २६. शरीराच्या कोणत्याही भागात त्वेचवर गाठी होणे/ Tumors in any
              part of the body
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २७. हात आणि पायावर तळव्यांना वारंवार सुन्न होणे/ Frequent numbness
              of palms on hands and feet
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>{" "}
          <QuestionRow>
            <QuestionCol>
              २८. हाताची आणि पायाची बोटे वाकडी होणे/ Crooked fingers and toes
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २९. हातांना आणि पायांना मुंग्या येणे आणि बधिर होणे/ Tingling in
              hands and feet and deafness
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३०. डोळयांच्या पापण्या पूर्ण बंद न होणे/ Incomplete closure of
              eyelids
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३१. हातांच्या पंजांमध्ये वस्तू व्यवस्थित पकडण्यास त्रास होणे/
              Difficulty grasping objects properly in the claws of the hands
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३२. पायातील दुबळेपणामुळे चालण्यास त्रास होणे/ Difficulty walking
              due to weakness in legs
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <FormHeader>B2 : Women only / बी २ : केवळ महिला</FormHeader>
          <QuestionRow>
            <QuestionCol>
              १. स्तनामध्ये गाठ असणे/ Having a lump in the breast
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. स्तनाग्रातून रक्त मिश्रीत स्त्राव होणे/ Bloody discharge from
              the nipple
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३. स्तनाच्या आकारात बदल होणे/ Changes in breast size
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ४. दोन मासिक पाळीच्या मध्ये रक्त स्त्राव होणे/ Bleeding between
              two periods
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ५. मासिक पाळी बंद झाल्यानंतर रक्तस्त्राव होणे/ Bleeding after
              cessation of menstruation
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ६. संभोगानंतर रक्तस्त्राव/ Bleeding after cessation of
              menstruation
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ७. योनीमधून दुर्गंधीयुक्त स्त्राव/ Foul smelling vaginal discharge
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <FormHeader>
            B3 : For Senior Citizens (60 years and above)/बी ३ : वयोवृध्दांसाठी
            (६० वर्ष व त्यापेक्षा अधिक)
          </FormHeader>
          <QuestionRow>
            <QuestionCol>
              १. उभे असताना किंवा चालताना तुम्हाला अस्थिरपणा वाटतो का ?/ Do you
              feel unsteady while standing or walking?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. शारीरिक अपंगत्वाने ग्रस्त असल्यास हालचाली करण्यास अडथळा येणे/
              Impairment of movement if suffering from physical disability
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३. खाणे, कपडे घालणे, परिधान करणे, आंघोळ करणे, चालणे किंवा शौचालय
              वापरणे यासारख्या दैनंदिन क्रिया करण्यासाठी आपल्याला इतरांच्या
              मदतीची आवश्यकता आहे का ?/ Do you need help from others to perform
              daily activities such as eating, dressing, dressing, bathing,
              walking or using the toilet?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ४. आपल्या घरचा पत्ता किंवा घरातील व्यक्तीची नावे विसरणे ?/ 4.
              Forgetting your home address or household names?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <SubmitButtonDiv>
            <SubmitButton>Submit & Continue</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
        <Tabs.TabPane tab="3) Part C / भाग क" key="tab3">
          <FormHeader>
            C: Risk factors for COPD / भाग सी : सीओपीडीसाठी जोखीम घटक
          </FormHeader>
          <QuestionRow>
            <QuestionCol>
              १. सर्व लागू असलेले मंडळ / All applicable circles
            </QuestionCol>
            <AnswerCol>
              <InputForm type="text"></InputForm>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. स्वयंपाक करण्यासाठी वापरल्या जाणा-या इंधनाचा प्रकार – फायरवुड /
              पीक अवशेष / शेण केक / कोळसा / केरोसीन / एलपीजी / Type of fuel used
              for cooking – Firewood / Crop residue / Dung cake / Coal /
              Kerosene / LPG
            </QuestionCol>
            <AnswerCol>
              <TextAreaForm type="text"></TextAreaForm>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३. व्यावसायिक प्रदर्शनासह – पिकाचे अवशेष जाळणे / कचरा जाळणे – पाने
              / धूर, वायू आणि धूळ प्रदर्शनासह उद्योगांमध्ये काम करणे जसे की
              पीटभट्टया आणि काचेच्या कारखाने इ. / With occupational exposure –
              burning of crop residues / burning of waste – leaves / working in
              industries with exposure to fumes, gases and dust like peat kilns
              and glass factories etc.
            </QuestionCol>
            <AnswerCol>
              <TextAreaForm type="text"></TextAreaForm>
            </AnswerCol>
          </QuestionRow>
          <SubmitButtonDiv>
            <SubmitButton>Submit & Continue</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
        <Tabs.TabPane tab="4) Part D / भाग डी" key="tab4">
          <FormHeader>D : PHQ 2 / डी : पीएचक्यू २</FormHeader>
          <FormHeader>
            · गेल्या २ आठवडयांत, आपण खालील समस्यांद्वारे किती वेळा त्रास दिला
            आहे- / In the past 2 weeks, how often have you been bothered by the
            following problems? is-
          </FormHeader>
          <QuestionRow>
            <QuestionCol>
              १. गोष्टी करण्यात थोडीशी आवड किंवा आनंद असणे ?
            </QuestionCol>
            <AnswerCol>
              <InputForm type="text"></InputForm>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. निराश किंवा उदासीन असणे ? Being depressed ?
            </QuestionCol>
            <AnswerCol>
              <InputForm type="text"></InputForm>
            </AnswerCol>
          </QuestionRow>
          <SubmitButtonDiv>
            <SubmitButton>Submit & Continue</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
        <Tabs.TabPane tab="5) Part E / भाग ई">
          <QuestionRow>
            <QuestionCol>
              1. तुम्हाला ताप आहे का? / Do you have fever?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionSubRow>
            <QuestionSubCol>
              A. 7 दिवसांपेक्षा जास्त काळ / More than 7 days
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              B. 7 दिवसांपेक्षा कमी / Less than 7 days
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              C. थंडी वाजून येणे सह / With Chills
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol>D. रॅश सह / With Rash</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol> E. रक्तस्त्राव सह / with Bleeding</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>

          <QuestionRow>
            <QuestionCol>
              2. डोळ्यांच्या बुबुळाच्या पुढील भागाचा होणारा दाह (डोळा येणे) ?
              Conjuctivitis ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionSubRow>
            <QuestionSubCol> A. पाणचट / Wattery</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol> B. लालसरपणा / redness</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol> C. खाज सुटलेले डोळे / itching eyes</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionRow>
            <QuestionCol>
              3. तुम्हाला लेप्टोस्पायरोसिस आहे का? Do you have leptospirosis? ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              A.तुम्ही अनेकदा पाण्यात वावरता का? / Do you Waddling in water
              often?
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              B. गुरेढोरे / कुत्रा / मांजर / डुक्कर / उंदीर यांसारख्या पाळीव
              प्राण्यांच्या संपर्कात येणे? / Exposure to domestic animal like
              cattle / Dog / Cat / Pig / Rodent?
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>

          <QuestionRow>
            <QuestionCol>
              4. तुम्हाला जुलाब, हगवण, संडास आहे का ? Do you have loose motion ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionSubRow>
            <QuestionSubCol> A. रक्तासह / With Blood</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol> B. रक्ताशिवाय / Without Blood</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol> C. उलट्या होणे / Vomitting</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>

          <QuestionRow>
            <QuestionCol>
              5. तुम्हाला लिव्हरला सूज / कावीळ आहे का ? Do you have Hepatitis /
              Jaundice ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              A. तुम्ही बाहेरचे/ उघडे अन्न खाता/ दूषित पाणी पिता का? /Do you
              eating outside / uncovered food / drinking contaminated water ?
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol> B. रक्ताशिवाय / Without Blood</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol> C. उलट्या होणे / Vomitting</QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>

          <QuestionRow>
            <QuestionCol>
              6. तुम्हाला प्राण्यांनी चावले आहे का ? did animals have Bitten you
              ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              7. तुम्हाला साप चावला आहे का ? did Snake have Bitten you ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              8. तुम्हाला कुष्ठरोग आहे का ? do you have Leprosy ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group>
                <Radio value={1}>Yes / होय</Radio>
                <Radio value={2}>No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              A. बधीरपणा / हात/पायांमध्ये मुंग्या येणे ? / Numbness / Tingling
              in hands/feet ?
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              B. शरीराच्या कोणत्याही भागात संवेदना कमी होणे ? / Loss of
              sensation in any parts of body ?
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              C. चेहरा/हात/पायांवर सूज ? /Swelling / Nodule on Face/Hands/Feet ?
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              D. पापणी किंवा भुवया गळणे ? / Loss of eyelash or eyebrow ?
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <QuestionSubRow>
            <QuestionSubCol>
              {" "}
              E. कानातले दाट ? / Thickened earlobes ?
            </QuestionSubCol>
            <AnswerSubCol>
              <Checkbox></Checkbox>
            </AnswerSubCol>
          </QuestionSubRow>
          <SubmitButtonDiv>
            <SubmitButton>Submit</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
      </DocsTab>
    </div>
  );
}

export default Register;
