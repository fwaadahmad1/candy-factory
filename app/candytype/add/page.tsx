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
import { string, z } from "zod";
import { addStageSchema } from "@/app/candytype/add/form/addStage.schema";
import { Button } from "@/components/ui/button";
import { addCandySchema } from "@/app/candytype/add/form/addCandy.schema";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { useAddCandyTypeMutation } from "@/features/ApiSlice/candyTypeSlice";

type candyTypeData = {
  
    name : string,
    ingredients : string[],
    quantity_ingredient : string,
    total_time: number,
    mixer_settings: string[],
    cooker_settings:string[],
    extruder_settings:string[],
    packaging_settings:string[],
    quantity_mixer_settings: string,
    quantity_cooker_settings: string,
    quantity_extruder_settings: string,
    quantity_packaging_settings: string,
  
}

// type addSettings = {
//   mixer_settings: string[],
//     cooker_settings:string[],
//     extruder_settings:string[],
//     packaging_settings:string[],
// }
const AddCandyType = () => {
  const [stageForms, setStageForms] = useState<
    Array<Omit<z.infer<typeof addStageSchema>, "conf_name" | "conf_setting">>
  >([]);

  const [addCandyType,error] = useAddCandyTypeMutation({});
  // const[addAddSettings] = useAddCandyTypeMutation({})
  const stageFormRefs = useRef<Array<AddStageFormHandle | null>>([]);
  const candyFormRef = useRef<AddCandyFormHandle>(null);
  const [candyForm, setCandyForm] = useState<
    Omit<z.infer<typeof addCandySchema>, "ingredient" | "quantity">
  >({ candyName: "", ingredientItem: [] });

  const [hasErrors, setHasErrors] = useState(true);

  useEffect(() => {
    if (!hasErrors && candyForm.candyName) {
      const ingredientName: string[] = [];
        const ingQty: number[] = [];
        candyForm.ingredientItem.forEach((item, i) => {
          ingredientName[i] = item.ingredient;
        });
        candyForm.ingredientItem.forEach((item, i) => {
          ingQty[i] = Number(item.quantity);
        });
      // API call for submit goes here
      // console.log(ingredientName,ingQty);

      
      const stageObj :any = {}
      //const addSettingsObj : any ={}
      let totalTime : number = 0.0 ;
      
      
      for(let i =0 ; i< (stageForms.length) ; i++){
        const configSetting: String[] = [];
        const quantitiesConfigSetting: number[] = [];
        stageForms[i].conf_item.forEach((item, i) => {
          if(item.conf_name === 'estimated time'){
            totalTime +=Number(item.conf_setting);
            console.log(totalTime,item.conf_name,item.conf_setting )
          }
          configSetting[i] = item.conf_name;
          
        });
        stageForms[i].conf_item.forEach((item, i) => {
          quantitiesConfigSetting[i] = Number(item.conf_setting);
        });
        
        stageObj[stageForms[i].name] = configSetting;
        //addSettingsObj[stageForms[i].name] = configSetting;
        stageObj[`quantity_${stageForms[i].name}`] = JSON.stringify(quantitiesConfigSetting);
      }
      // console.log(stageObj)
      //console.log(addSettingsObj);
    //   for (const entry of addSettingsObj) {
    //     console.log(entry)
    // }
      const candyData : candyTypeData = {
        name : candyForm.candyName,
        ingredients : ingredientName,
        quantity_ingredient : JSON.stringify(ingQty),
        total_time:totalTime + 0.0,
        ...stageObj
      }
      console.log(candyData);
      try {
        addCandyType(candyData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [addCandyType, candyForm, hasErrors, stageForms]);

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
