"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CustomInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWalletStore } from "@/lib/stores/wallet";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function LimitOrder() {
  const walletStore = useWalletStore();
  const wallet = walletStore.wallet;
  const onConnectWallet = walletStore.connectWallet;

  const [state, setState] = useState({
    sellToken: "MINA",
    buyToken: "USDT",
    sellAmount: 0,
    buyAmount: 0,
    rate: "0",
    validForDays: 0,
  });

  useEffect(() => {
    if (state.sellAmount > 0 && state.buyAmount > 0) {
      const rate = (state.buyAmount / state.sellAmount).toPrecision(4);
      setState({
        ...state,
        rate,
      });
    } else {
      setState({
        ...state,
        rate: "0",
      });
    }
  }, [state.buyAmount, state.sellAmount]);

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="mx-auto -mt-32 h-full pt-16">
      <div className="flex h-full w-full items-center justify-center pt-16">
        <div className="flex basis-4/12 flex-col items-center justify-center 2xl:basis-3/12">
          <Card className="w-full border-0 p-4 shadow-none">
            <div className="mb-2 flex flex-row items-center justify-center gap-2">
              <h2 className="text-2xl font-bold">Limit Order</h2>
            </div>

            <div className="flex flex-row items-center rounded-2xl border p-4">
              <Label className="px-3 text-sm text-gray-600">
                Sell
                <CustomInput
                  value={state.sellAmount}
                  onChange={(e) => {
                    setState({
                      ...state,
                      sellAmount: Number(e.target.value),
                    });
                  }}
                  placeholder={"0"}
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={40}
                  inputMode="decimal"
                  type="number"
                />
              </Label>

              <Select
                value={state.sellToken}
                onValueChange={(value) => {
                  setState({ ...state, sellToken: value });
                }}
              >
                <SelectTrigger className=" w-60 rounded-2xl">
                  <SelectValue placeholder="Select a token to swap" />
                </SelectTrigger>

                <SelectContent className=" items-center  rounded-2xl text-center">
                  <SelectItem value="MINA">MINA</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative my-2 w-96">
              <Button
                variant={"outline"}
                className=" absolute bottom-0 left-0 right-0 top-0 mx-auto my-auto border-0  ring-1 ring-border ring-offset-4 hover:bg-card"
                size={"icon"}
                onClick={() => {
                  const sell = state.sellToken;
                  const buy = state.buyToken;

                  setState({
                    ...state,
                    sellToken: buy,
                    buyToken: sell,
                  });
                }}
              >
                <ArrowUpDown className="h-3 w-3 "></ArrowUpDown>
              </Button>
            </div>

            <div className="flex flex-row items-center rounded-2xl border p-4">
              <Label className="px-3 text-sm text-gray-600">
                For
                <CustomInput
                  value={state.buyAmount}
                  onChange={(e) => {
                    setState({
                      ...state,
                      buyAmount: Number(e.target.value),
                    });
                  }}
                  placeholder={"0"}
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={40}
                  inputMode="decimal"
                  type="number"
                />
              </Label>

              <Select
                value={state.buyToken}
                onValueChange={(value) => {
                  setState({ ...state, buyToken: value });
                }}
              >
                <SelectTrigger className=" w-60 rounded-2xl">
                  <SelectValue placeholder="Select a token to swap" />
                </SelectTrigger>

                <SelectContent className=" items-center  rounded-2xl text-center">
                  <SelectItem value="MINA">MINA</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-2 grid grid-cols-5 rounded-2xl border p-4">
              <div className=" col-span-3">
                <Label className="px-3 text-sm text-gray-600">
                  {state.sellToken} / {state.buyToken} Rate
                  <CustomInput
                    className=" text-lg"
                    value={state.rate}
                    placeholder="0"
                    readOnly
                    type="text"
                  />
                </Label>
              </div>

              <div className=" col-span-2">
                <Label className="px-3 text-sm text-gray-600">
                  Valid For Days
                  <CustomInput
                    value={state.validForDays}
                    onChange={(e) => {
                      setState({
                        ...state,
                        validForDays: Number(e.target.value),
                      });
                    }}
                    placeholder={"0"}
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    minLength={1}
                    maxLength={40}
                    inputMode="decimal"
                    type="number"
                  />
                </Label>
              </div>
            </div>

            <Button
              size={"lg"}
              type="submit"
              className="mt-6 w-full rounded-2xl"
              onClick={() => {
                wallet ?? onConnectWallet();
                wallet && handleSubmit();
              }}
            >
              {wallet ? "Place Order" : "Connect wallet"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
