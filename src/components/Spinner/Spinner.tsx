"use client"
import { Flex, Spin } from "antd";

export default function Spinner() {
    return (
        <Flex align="center" gap="middle" className="justify-center">
            <Spin size="large" />
        </Flex>
    )
}
