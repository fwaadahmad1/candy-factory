"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import AddCandyForm, {
  AddCandyFormHandle,
} from "@/app/candytype/add/form/addCandy.form";
import AddStageForm, {
  AddStageFormHandle,
} from "@/app/candytype/add/form/addStage.form";
import { z } from "zod";
import { addStageSchema } from "@/app/candytype/add/form/addStage.schema";
import { Button } from "@/components/ui/button";
import { addCandySchema } from "@/app/candytype/add/form/addCandy.schema";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

const AddCandyType = () => {
  const [stageForms, setStageForms] = useState<
    Array<Omit<z.infer<typeof addStageSchema>, "conf_name" | "conf_setting">>
  >([]);

  const stageFormRefs = useRef<Array<AddStageFormHandle | null>>([]);
  const candyFormRef = useRef<AddCandyFormHandle>(null);
  const [candyForm, setCandyForm] = useState<
    Omit<z.infer<typeof addCandySchema>, "ingredient" | "quantity">
  >({ name: "", ingredientItem: [] });

  const [hasErrors, setHasErrors] = useState(true);

  useEffect(() => {
    if (!hasErrors && candyForm.name) {
      // API call for submit goes here
      console.log(candyForm);
      stageForms.forEach((form) => console.log(form));
    }
  }, [candyForm, hasErrors, stageForms]);

  function onError() {
    setHasErrors(true);
  }

  return (
    <div className={"flex flex-col w-full h-full gap-2"}>
      <Card className={"w-full min-h-full"}>
        <CardHeader className={"text-4xl font-extrabold"}>Add Candy</CardHeader>
        <CardContent
          className={
            "px-6 py-2 flex flex-col gap-8 items-start justify-between"
          }
        >
          <AddCandyForm
            ref={candyFormRef}
            onSubmit={(data) => setCandyForm(data)}
            onError={onError}
          />

          {stageForms.length > 0 && (
            <h1 className={"text-4xl font-extrabold self-start"}>Stages: </h1>
          )}

          {stageForms.map((data, index) => {
            return (
              <div className={"relative w-full"} key={data.name}>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className={"absolute right-0"}
                  onClick={() => {
                    setStageForms((prevState) => {
                      const newState = [...prevState];
                      newState.splice(index, 1);
                      return newState;
                    });
                    stageFormRefs.current.splice(index, 1);
                    // stageFormRefs.current[index] = null;
                    // setStageForms([]);
                  }}
                >
                  <X />
                </Button>
                <AddStageForm
                  ref={(element) => (stageFormRefs.current[index] = element)}
                  name={data.name}
                  onSubmit={(data) =>
                    setStageForms((prevState) => {
                      let newState = [...prevState];
                      newState[index] = data;
                      return newState;
                    })
                  }
                  onError={onError}
                />
                <Separator className={"mt-4"} />
              </div>
            );
          })}

          <CardFooter className={"w-full p-6 flex gap-4 justify-end items-end"}>
            <Button
              variant={"outline"}
              onClick={() =>
                setStageForms((prevState) => {
                  return [
                    ...prevState,
                    { name: `Stage ${prevState.length + 1}`, conf_item: [] },
                  ];
                })
              }
            >
              Add Stage
            </Button>
            <Button
              variant={"secondary"}
              onClick={(e) => {
                e.preventDefault();
                setHasErrors(false);
                candyFormRef.current?.submit();
                stageFormRefs.current.forEach((formRef) => formRef?.submit());
              }}
            >
              Submit
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCandyType;
