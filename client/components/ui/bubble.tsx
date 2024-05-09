import Balancer from "react-wrap-balancer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formattedText } from "@/app/utils";

interface chatBubbleProps {
  role: string;
  content: string | undefined;
  sources: string[] | undefined;
}

const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

const Bubble = ({ role, content, sources }: chatBubbleProps) => {
  return (
    <div>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle
            className={
              role != "assistant"
                ? "text-amber-500 dark:text-amber-200"
                : "text-blue-500 dark:text-blue-200"
            }
          >
            {role == "assistant" ? "AI" : "You"}
          </CardTitle>
        </CardHeader>
        {content && content.length ? (
          <CardContent className="text-lg">
            <Balancer>{convertNewLines(content)}</Balancer>
          </CardContent>
        ) : null}
        <CardFooter>
          {sources && sources.length ? (
            <Accordion type="single" collapsible className="w-full">
              {sources.map((source, index) => (
                <AccordionItem value={`source-${index}`} key={index}>
                  <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                  <AccordionContent>
                    {"Source: " + source.source}
                  </AccordionContent>
                  <AccordionContent>
                    {"Content: " + source.content}
                  </AccordionContent>
                  <AccordionContent>
                    {"Page Number: " + source.pageNumber}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Bubble;
